import cryptojs from "crypto-js";
import jwt from "jsonwebtoken";
import Agent from "../models/Agent";
import { Request, Response } from "express";

const JWT_KEY = process.env.JWT_KEY || "key";

type AgentType = {
  _id: string;
  firstName: string;
  lastName: string;
  contact_no: string;
  email: string;
  password: string;
};

export async function agentCreation(req: { body: AgentType }, res: Response) {
  const hashedPassword = cryptojs
    .SHA256(req.body.password)
    .toString(cryptojs.enc.Base64);
  req.body.password = hashedPassword;

  const matchFound = (await Agent.exists({ email: req.body.email }))
    ? true
    : false;
  if (!matchFound) {
    res.status(500).send();
    return;
  }

  const newAgent = new Agent(req.body);
  const savedAgent = await newAgent.save();

  const token = jwt.sign(
    {
      agentId: savedAgent._id,
    },
    JWT_KEY,
    { expiresIn: "10d" }
  );

  res.status(201).json({ token });
}

export async function getAgentInfo(req: { query: { agentId: string } }, res) {
  const agent = await Agent.findById(req.query.agentId);

  if (!agent) {
    res.status(404).send();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...agentInfo } = agent.toObject();
  res.status(500).json(agentInfo);
}

type UpdateAgentReq = Request & {
  user: { agentId: string };
  body: Partial<AgentType>;
};
export async function updateAgentInfo(req: UpdateAgentReq, res: Response) {
  const exists = (await Agent.exists({ _id: req.user.agentId })) ? true : false;
  if (!exists) {
    res.status(404).send();
    return;
  }

  await Agent.findByIdAndUpdate(req.user.agentId, req.body);
  res.status(200).send();
}
