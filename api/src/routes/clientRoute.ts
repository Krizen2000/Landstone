import { Router } from "express";
import getInterestedClientsByAgentId, {
  clientCreation,
  clientLogin,
  getClientInfo,
  saveProperty,
  unsaveProperty,
  updateClientInfo,
} from "../controllers/clientController";
import tokenAuthorizer from "../middlewares/tokenAuthorizer";

const clientRouter = Router();

clientRouter.get("/interestedByAgentId", getInterestedClientsByAgentId);
clientRouter.get("/search", getClientInfo);
clientRouter.post("/", clientCreation);
clientRouter.post("/login", clientLogin);
clientRouter.put("/", tokenAuthorizer, updateClientInfo);
clientRouter.put("/saveProperty", tokenAuthorizer, saveProperty);
clientRouter.put("/unsaveProperty", tokenAuthorizer, unsaveProperty);

export default clientRouter;
