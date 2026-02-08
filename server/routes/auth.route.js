import { Router } from "express";

const authRouter = Router();

authRouter.post('/register', (req, res) => res.json({msg: 'welcome to /register'}));
authRouter.post('/login', (req, res) => res.json({msg: 'welcome to /login'}));
authRouter.post('/logout', (req, res) => res.json({msg: 'welcome to /logout'}));

export default authRouter;