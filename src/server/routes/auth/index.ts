import express from "express";
import { tokenCheck } from "../../middleware/tokenCheck";
import loginRouter from "./login";
import registerRouter from "./register";
import verifyRouter from "./verify";

const router = express.Router();

router.get("/check_token", tokenCheck, (req, res) => res.json({ message: ":)" }));
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/verify", verifyRouter);

export default router;
