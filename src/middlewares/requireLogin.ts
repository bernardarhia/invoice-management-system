import { Response, Request, NextFunction } from "express";

export const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).send("You must be logged in");
  }
  next();
};
