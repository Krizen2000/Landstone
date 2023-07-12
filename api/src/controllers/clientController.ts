import cryptojs from "crypto-js";
import jwt from "jsonwebtoken";
import Client from "../models/Client";
import { Request, Response } from "express";

const JWT_KEY = process.env.JWT_KEY || "key";

type ClientType = {
  _id: string;
  firstName: string;
  lastName: string;
  contact_no: string;
  email: string;
  password: string;

  saved_properties: string[] | null;
  interested_properties: string[] | null;
};
function isClientType(obj): obj is ClientType {
  return (
    typeof obj._id === "string" &&
    typeof obj.firstName === "string" &&
    typeof obj.lastName === "string" &&
    typeof obj.contact_no === "string" &&
    typeof obj.email === "string" &&
    typeof obj.password === "string"
  );
}

type ClientCreationReq = Request & { body: ClientType };
export async function clientCreation(req: ClientCreationReq, res: Response) {
  if (!isClientType(req.body)) {
    res.status(400).send();
    return;
  }
  const hashedPassword = cryptojs
    .SHA256(req.body.password)
    .toString(cryptojs.enc.Base64);
  req.body.password = hashedPassword;

  const matchFound = (await Client.exists({ email: req.body.email }))
    ? true
    : false;
  if (!matchFound) {
    res.status(500).send();
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

  res.status(201).json({ token });
}

type ClientInfoReq = Request & { query: { clientId: string } };
export async function getClientInfo(req: ClientInfoReq, res: Response) {
  const client = await Client.findById(req.query.clientId);

  if (!client) {
    res.status(404).send();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...agentInfo } = client.toObject();
  res.status(500).json(agentInfo);
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
