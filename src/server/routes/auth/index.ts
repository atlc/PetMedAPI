import express from "express";
import { tokenCheck } from "../../middleware/auth/tokenCheck";
import loginRouter from "./login";
import registerRouter from "./register";
import verifyRouter from "./verify";
import { is_valid_user } from "../../middleware/auth/registration";

const router = express.Router();

router.get("/check_token", tokenCheck, (req, res) => res.json({ message: ":)" }));
router.use("/login", loginRouter);
router.use("/register", is_valid_user, registerRouter);
router.use("/verify", verifyRouter);

export default router;
