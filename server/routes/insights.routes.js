import { Router } from "express";
import authenticate from '../middlewares/authenticate.middleware.js'
import { dashboard } from '../controllers/insights.controller.js'

const insightsRouter = Router();

insightsRouter.get('/dashboard', authenticate, dashboard);

export default insightsRouter;