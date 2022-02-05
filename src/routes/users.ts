import { Request, Router, Response } from "express";
import { Users } from "../models/Users";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await Users.create({
      name: "John Doe",
      email: "",
      password: "12345",
      role: "admin",
    });
    req.session.user = users;
    return res.send(users);
  } catch (error) {
    console.log(error);
    return;
  }
});
export default router;
