import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY || "key";

export default function tokenDecryptor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send();
    return;
  }

  const token = bearerToken.split(" ")[1];
  if (!token) {
    res.status(403).json();
    return;
  }
  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      res.status(401).json();
      return;
    }
    req["user"] = user;
    next();
  });
}
