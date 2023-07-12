import { Router } from "express";
import {
  agentCreation,
  getAgentInfo,
  updateAgentInfo,
} from "../controllers/agentController";
import tokenAuthorizer from "../middlewares/tokenAuthorizer";

const agentRouter = Router();

agentRouter.get("/", getAgentInfo);
agentRouter.post("/", agentCreation);
agentRouter.put("/", tokenAuthorizer, updateAgentInfo);

export default agentRouter;
