import { Router } from "express";

const insightsRouter = Router();

insightsRouter.get('/most-spent', (req, res) => res.json({msg: 'welcome to /most-spent'}));
insightsRouter.get('/breakdown', (req, res) => res.json({msg: 'welcome to /breakdown'}));

export default insightsRouter;