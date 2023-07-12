import { Router } from "express";
import tokenDecryptor from "../middlewares/tokenDecryptor";
import {
  deleteProperty,
  getPropertyInfo,
  propertyCreation,
  tagAsInterested,
  updatePropertyInfo,
} from "../controllers/propertyController";
import tokenAuthorizer from "../middlewares/tokenAuthorizer";

const propertyRouter = Router();

propertyRouter.get("/", tokenDecryptor, getPropertyInfo);
propertyRouter.post("/", tokenAuthorizer, propertyCreation);
propertyRouter.put("/:propertyId", tokenAuthorizer, updatePropertyInfo);
propertyRouter.put("/:propertyId/interested", tokenAuthorizer, tagAsInterested);
propertyRouter.delete("/:propertyId", tokenAuthorizer, deleteProperty);

export default propertyRouter;
