import express from 'express';
import config from '../lib/auth-cloud';
const router = express.Router();

router.get('/login', config.passport.authenticate('oauth2'));
router.get('/callback', config.passport.authenticate('oauth2', { failureRedirect: '/',  successRedirect: '/' }));

export default router;
