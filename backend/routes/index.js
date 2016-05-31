import express from 'express';
import authRoute from './auth';
import settingsRoute from './settings';
import statsRoute from './stats';
import saveMoneyRoute from './saveMoney';

const router = express.Router();

router.use("/auth", authRoute);
router.use(statsRoute);
router.use(settingsRoute);
router.use(saveMoneyRoute);

export default router;
