import { Request, Response } from "express";
import NewEmail from "../models/NewsEmail";

type NewsEmailType = { email: string };

type NewsEmailReq = Request & { body: NewsEmailType };
function isNewsEmail(obj): obj is NewsEmailType {
  return typeof obj.email === "string";
}

export async function newsEmailEntry(req: NewsEmailReq, res: Response) {
  if (!isNewsEmail(req.body)) {
    res.status(400).send();
    return;
  }
  const newsEmailExists = (await NewEmail.exists({ email: req.body.email }))
    ? true
    : false;

  if (newsEmailExists) {
    res.status(400).json({ error: "EMAIL_SUBSCRIBED" });
    return;
  }

  const newNewsEmail = new NewEmail(req.body);
  await newNewsEmail.save();
  res.status(201).send();
}
