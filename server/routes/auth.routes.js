import { Router } from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const authRouter = Router();

authRouter.post('/register', authLimiter, register);
authRouter.post('/login', authLimiter, login);
authRouter.get('/me', authenticate, getProfile);

export default authRouter;