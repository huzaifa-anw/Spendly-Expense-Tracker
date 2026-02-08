import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', (req, res) => res.json({msg: 'welcome to /login'}));
authRouter.post('/logout', (req, res) => res.json({msg: 'welcome to /logout'}));

export default authRouter;