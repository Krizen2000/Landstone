import { Router } from "express";
import { newsEmailEntry } from "../controllers/newsEmailController";

const newsEmailRouter = Router();

newsEmailRouter.get("/", (_, res) => res.status(200).json({ ok: "ok" }));
newsEmailRouter.post("/", newsEmailEntry);

export default newsEmailRouter;
