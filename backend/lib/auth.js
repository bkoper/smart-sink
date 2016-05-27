//TODO: finish this first

import express from 'express';
import config from '../../config/config';
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");

const router = express.Router();
let token;

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://accounts.artik.cloud/authorize',
        tokenURL: 'https://accounts.artik.cloud/authorize',
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: config.AUTH_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
        // it's only for server lifetime
        config.token = accessToken;
        done();
    }
));

router.get('/auth/', passport.authenticate('oauth2'));

router.get('/auth/callback',
    passport.authenticate('oauth2', { failureRedirect: '/',  successRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

export default router;
