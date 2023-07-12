import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY || "key";

export default function tokenDecryptor(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    next();
    return;
  }

  const token = bearerToken.split(" ")[1];
  if (!token) {
    next();
    return;
  }
  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      next();
      return;
    }
    req["user"] = user;
    next();
  });
}
