import { Router } from "express";
import {
  clientCreation,
  getClientInfo,
  updateClientInfo,
} from "../controllers/clientController";
import tokenAuthorizer from "../middlewares/tokenAuthorizer";

const clientRouter = Router();

clientRouter.get("/", getClientInfo);
clientRouter.post("/", clientCreation);
clientRouter.put("/", tokenAuthorizer, updateClientInfo);

export default clientRouter;
