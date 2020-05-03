var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var authKey = require("../config/auth-key.js");
const SocialAuthUserDetails = require("../module/authUserDetails.js");
const SocialAuthUser = require("../controllers/socialAuthUser.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: authKey.GOOGLE_CLIENT_ID,
      clientSecret: authKey.GOOGLE_CLIENT_SECRET,
      callbackURL: authKey.CALLBACK_URL,
      proxy: true
    },
    function (accessToken, refreshToken, profile, done) {
      if (profile) {
        let userData = {
          first_name: profile.name.familyName,
          last_name: profile.name.givenName,
          picture: profile.photos[0].value,
          provider: profile.provider,
          socialID: Number(profile.id)
        };
        SocialAuthUserDetails.find(
          { socialID: Number(profile.id) },
          (err, data) => {
            if (data.length != 0) {
              console.log("profile id ", data);
              return done(err, profile);
            } else {
              SocialAuthUserDetails.create(userData, err => {
                if (err) {
                  throw err;
                } else {
                  return done(err, profile);
                }
              });
            }
          }
        );
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
