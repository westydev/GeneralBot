const Strategy = require("passport-discord").Strategy;
const passport = require("passport")
const { DASHBOARD } = require("../../Settings/Config")

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  const AUTH = DASHBOARD.AUTH;
  
  
  passport.use(new Strategy({
      clientID: AUTH.clientID,
      clientSecret: AUTH.clientSecret,
      callbackURL:  AUTH.callbackURL,
      scope: AUTH.scope
      }, function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
          return done(null, profile);
      });
}));