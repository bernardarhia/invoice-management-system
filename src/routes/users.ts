import { Router } from "express";
import UserController from "../controllers/UserController";
import { requireLogin } from "../middlewares/requireLogin";
const router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.createAccount);
router.get("/:id", requireLogin, UserController.userProfile);
export default router;
