import { Router } from "express";
import { newsEmailEntry } from "../controllers/newsEmailController";

const newsEmailRouter = Router();

newsEmailRouter.post("/", newsEmailEntry);

export default newsEmailRouter;
