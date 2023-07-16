import { Router } from "express";
import {
  clientCreation,
  clientLogin,
  getClientInfo,
  updateClientInfo,
} from "../controllers/clientController";
import tokenAuthorizer from "../middlewares/tokenAuthorizer";

const clientRouter = Router();

// clientRouter.get("/", getClientInfo);
clientRouter.get("/search", getClientInfo);
clientRouter.post("/", clientCreation);
clientRouter.post("/login", clientLogin);
clientRouter.put("/", tokenAuthorizer, updateClientInfo);

export default clientRouter;
