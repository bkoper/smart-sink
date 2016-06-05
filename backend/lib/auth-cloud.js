import config from '../../config/config';
import OAuth2Strategy from "passport-oauth2";
import {coldSami, hotSami} from '../lib/websocket-cloud';
import passport from "passport";
let authCloud = {};

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://accounts.artik.cloud/authorize',
        tokenURL: 'https://accounts.artik.cloud/token',
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: config.AUTH_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
        // it's only for server lifetime
        authCloud.token = accessToken;
        coldSami.connect();
        hotSami.connect();
        done();
    }
));

authCloud.passport = passport;

export default authCloud;
