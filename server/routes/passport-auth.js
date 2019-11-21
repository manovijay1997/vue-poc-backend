var passport = require("passport");
const URL = process.env.PORT || 3001;
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const port = process.env.PORT || 3001;

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
      console.log("what is  red ", req.user.id);
      res
        .status(301)
        .redirect(
          `https://vj-portfolio.herokuapp.com/dashboard?id=${req.user.id}`
        );
    }
  );
};
