var passport = require("passport");
const URL = process.env.PORT || 3001;
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const port = process.env.PORT || 3001;
const url = require("../config/auth-key.js");

console.log(port);
module.exports = function(app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    function(req, res) {
      console.log("what is  red ", Number(req.user.id));
      res
        .status(301)
        .redirect(`${url.REDIRECT_URL}/dashboard?id=${Number(req.user.id)}`);
    }
  );
};
