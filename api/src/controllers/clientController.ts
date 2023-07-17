import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Client from "../models/Client";
import { NextFunction, Request, Response } from "express";
import Property from "../models/Property";

const JWT_KEY = process.env.JWT_KEY || "key";

type ClientType = {
  _id: string;
  firstName: string;
  lastName: string;
  contact_no: string;
  email: string;
  password: string;

  saved_properties: string[];
};
function isClientType(obj): obj is Omit<ClientType, "_id"> {
  return (
    typeof obj.firstName === "string" &&
    typeof obj.lastName === "string" &&
    typeof obj.contact_no === "string" &&
    typeof obj.email === "string" &&
    typeof obj.password === "string"
  );
}

type ClientCreationReq = Request & { body: ClientType };
export async function clientCreation(req: ClientCreationReq, res: Response) {
  if (!isClientType(req.body) || !req.body.email) {
    res.status(400).send();
    return;
  }

  const hashedPassword = CryptoJS.SHA256(req.body.password).toString(
    CryptoJS.enc.Base64
  );
  req.body.password = hashedPassword;

  const matchFound = (await Client.exists({ email: req.body.email }))
    ? true
    : false;
  if (matchFound) {
    res.status(409).json({ error: "CLIENT EXISTS" });
    return;
  }

  const newClient = new Client(req.body);
  const savedClient = await newClient.save();

  const token = jwt.sign(
    {
      clientId: savedClient._id,
    },
    JWT_KEY,
    { expiresIn: "10d" }
  );

  res.status(201).json({ token, clientId: savedClient._id });
}

type ClientLoginData = { email: string; password: string };
type ClientLoginReq = Request & { body: ClientLoginData };
export async function clientLogin(req: ClientLoginReq, res: Response) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send();
    return;
  }
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      res.status(400).send();
      return;
    }
    const clientInfo = client.toObject();

    const loginPassword = CryptoJS.SHA256(req.body.password).toString(
      CryptoJS.enc.Base64
    );

    if (clientInfo.password !== loginPassword) {
      res.status(401).json({ error: "PASSWORD MISMATCH!" });
      console.error(
        "Storedpass: "
          .concat(clientInfo.password)
          .concat(" GivenPass: ")
          .concat(loginPassword)
      );
      return;
    }

    const token = jwt.sign(
      {
        clientId: client._id,
      },
      JWT_KEY
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, _id, ...userInfo } = clientInfo;
    res.status(200).json({ ...userInfo, token, clientId: _id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

type ClientInfoReq = Request & { query: { clientId: string } };
export async function getClientInfo(
  req: ClientInfoReq,
  res: Response,
  next: NextFunction
) {
  if (!req.query.clientId) {
    next();
    return;
  }

  const client = await Client.findById(req.query.clientId);

  if (!client) {
    res.status(404).send();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, _id, ...clientInfo } = client.toObject();
  res.status(200).json({ ...clientInfo, clientId: _id });
}

export default async function getInterestedClientsByAgentId(
  req: Request,
  res: Response
) {
  if (!req.query.agentId) {
    res.status(400).send();
    return;
  }
  const properties = await Property.find({ agentId: req.query.agentId });
  if (!properties) {
    res.status(40).json({ error: "PROPERTY NOT FOUND" });
    return;
  }
  const interestedIds = properties
    .map((property) => property.toObject().interested)
    .reduce((state, groupId) => [...state, ...groupId], []);
  if (!interestedIds) {
    res.status(400).send();
    return;
  }
  const clients = await Promise.all(
    interestedIds.map(async (clientId) => {
      const client = await Client.findById(clientId);
      if (!client) return null;
      return client.toObject();
    })
  );
  res.status(200).json({ clients });
}

type UpdateClientReq = Request & {
  user: { clientId: string };
  body: Partial<ClientType>;
};
export async function updateClientInfo(req: UpdateClientReq, res: Response) {
  const exists = (await Client.exists({ _id: req.user.clientId }))
    ? true
    : false;
  if (!exists) {
    res.status(404).send();
    return;
  }

  await Client.findByIdAndUpdate(req.user.clientId, req.body);
  res.status(200).send();
}

type SaveUnsavePropertyReq = Request & {
  user: { clientId: string };
  body: { propertyId: string };
};
export async function saveProperty(req: SaveUnsavePropertyReq, res: Response) {
  if (!req.body.propertyId) {
    res.status(400).send();
    return;
  }
  const clientObj = await Client.exists({ _id: req.user.clientId });
  const exists = clientObj ? true : false;
  if (!exists) {
    res.status(404).send();
    return;
  }
  const client = await Client.findById(req.user.clientId);
  const clientInfo = client?.toObject() ?? null;
  if (!clientInfo) {
    res.status(500).json({ error: "CLIENT NOT FOUND" });
    return;
  }
  const itemExists = clientInfo.saved_properties.indexOf(req.body.propertyId);
  if (itemExists > 0) {
    res.status(200).send();
    return;
  }

  await Client.findByIdAndUpdate(req.user.clientId, {
    $push: {
      saved_properties: req.body.propertyId,
    },
  })
    .then(() => res.status(200).send())
    .catch((err) => res.status(500).json({ error: err }));
}

export async function unsaveProperty(
  req: SaveUnsavePropertyReq,
  res: Response
) {
  const clientObj = await Client.exists({ _id: req.user.clientId });
  const exists = clientObj ? true : false;
  if (!exists) {
    res.status(404).send();
    return;
  }
  const client = await Client.findById(req.user.clientId);
  const clientInfo = client?.toObject() ?? null;
  if (!clientInfo) {
    res.status(500).json({ error: "CLIENT NOT FOUND" });
    return;
  }
  const itemExists = clientInfo.saved_properties.indexOf(req.body.propertyId);
  if (itemExists > 0) {
    res.status(200).send();
    return;
  }

  await Client.findByIdAndUpdate(req.user.clientId, {
    $pull: {
      saved_properties: req.body.propertyId,
    },
  })
    .then(() => res.status(200).send())
    .catch((err) => res.status(500).json({ error: err }));
}
