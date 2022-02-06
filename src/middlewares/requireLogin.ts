import { Response, Request, NextFunction } from "express";

export const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send("You must be logged in");
  }
  next();
};
