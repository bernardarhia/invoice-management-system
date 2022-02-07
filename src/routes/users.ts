import { Router } from "express";
import UserController from "../controllers/UserController";
import { requireLogin } from "../middlewares/requireLogin";
const userRouter = Router();

userRouter.post("/login", UserController.login);
userRouter.post("/register", UserController.createAccount);
userRouter.get("/:id", requireLogin, UserController.userProfile);
export default userRouter;
