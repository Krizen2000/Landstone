import CryptoJS from "crypto-js";
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
function isAgentType(obj): obj is Omit<AgentType, "_id"> {
  return (
    typeof obj.firstName === "string" &&
    typeof obj.lastName === "string" &&
    typeof obj.contact_no === "string" &&
    typeof obj.email === "string" &&
    typeof obj.password === "string"
  );
}

type AgentCreationReq = Request & { body: AgentType };
export async function agentCreation(req: AgentCreationReq, res: Response) {
  if (!isAgentType(req.body)) {
    res.status(400).send();
    return;
  }

  const hashedPassword = CryptoJS.SHA256(req.body.password).toString(
    CryptoJS.enc.Base64
  );
  req.body.password = hashedPassword;

  const matchFound = (await Agent.exists({ email: req.body.email }))
    ? true
    : false;
  if (matchFound) {
    res.status(409).json({ error: "AGENT EXISTS" });
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

  res.status(201).json({ token, agentId: savedAgent._id });
}

type AgentLoginData = { email: string; password: string };
function isAgentLoginData(obj): obj is AgentLoginData {
  return typeof obj.email === "string" && typeof obj.password === "string";
}
type AgentLoginReq = Request & { body: AgentLoginData };
export async function agentLogin(req: AgentLoginReq, res: Response) {
  if (!isAgentLoginData(req.body)) {
    res.status(400).send();
    return;
  }
  try {
    const agent = await Agent.findOne({ email: req.body.email });
    if (!agent) {
      res.status(400).json({ error: "AGENT NOT FOUND" });
      return;
    }

    const loginPassword = CryptoJS.SHA256(req.body.password).toString(
      CryptoJS.enc.Base64
    );

    if (agent.password !== loginPassword) {
      res.status(401).json({ error: "PASSWORD MISMATCH!" });
      console.error(
        "Storedpass: "
          .concat(agent.password)
          .concat(" GivenPass: ")
          .concat(loginPassword)
      );
      return;
    }

    const token = jwt.sign(
      {
        agentId: agent._id,
      },
      JWT_KEY
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, _id, ...userInfo } = agent.toObject();
    res.status(200).json({ ...userInfo, agentId: _id, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

type AgentInfo = Request & { query: { agentId: string } };
export async function getAgentInfo(req: AgentInfo, res: Response) {
  const agent = await Agent.findById(req.query.agentId);

  if (!agent) {
    res.status(404).send();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, _id, ...agentInfo } = agent.toObject();
  res.status(500).json({ ...agentInfo, agentId: _id });
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
