var passport = require("passport");
const URL = process.env.PORT || 3001;
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const port = process.env.PORT || 3001;
const url = require("../config/auth-key.js");

// console.log(port);
module.exports = function (app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    function (req, res) {
      const userId = cryptr.encrypt(req.user.id)
      res.redirect(`${url.REDIRECT_URL}/#/dashboard?id=${userId}`);
    }
  );
};
