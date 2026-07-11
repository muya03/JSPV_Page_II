import { Router, type IRouter } from "express";
import healthRouter from "./health";
import instagramRouter from "./instagram";
import twitterRouter from "./twitter";

const router: IRouter = Router();

router.use(healthRouter);
router.use(instagramRouter);
router.use(twitterRouter);

export default router;
