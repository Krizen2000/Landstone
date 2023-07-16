import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Client from "../models/Client";
import { NextFunction, Request, Response } from "express";

const JWT_KEY = process.env.JWT_KEY || "key";

type ClientType = {
  _id: string;
  firstName: string;
  lastName: string;
  contact_no: string;
  email: string;
  password: string;

  saved_properties: string[] | null;
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
function isClientLoginData(obj): obj is ClientLoginData {
  return typeof obj.email === "string" && typeof obj.password === "string";
}
type ClientLoginReq = Request & { body: ClientLoginData };
export async function clientLogin(req: ClientLoginReq, res: Response) {
  if (!isClientLoginData(req.body) || !req.body.email) {
    res.status(400).send();
    return;
  }
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      res.status(400).send();
      return;
    }

    const loginPassword = CryptoJS.SHA256(req.body.password).toString(
      CryptoJS.enc.Base64
    );

    if (client.password !== loginPassword) {
      res.status(401).json({ error: "PASSWORD MISMATCH!" });
      console.error(
        "Storedpass: "
          .concat(client.password)
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
    const { password, _id, ...userInfo } = client.toObject();
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
  const { password, _id, ...agentInfo } = client.toObject();
  res.status(200).json({ ...agentInfo, clientId: _id });
}

type UpdateClientReq = Request & {
  user: { agentId: string };
  body: Partial<ClientType>;
};
export async function updateClientInfo(req: UpdateClientReq, res: Response) {
  const exists = (await Client.exists({ _id: req.user.agentId }))
    ? true
    : false;
  if (!exists) {
    res.status(404).send();
    return;
  }

  await Client.findByIdAndUpdate(req.user.agentId, req.body);
  res.status(200).send();
}
