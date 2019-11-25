const userController = require("../controllers/userController.js");
module.exports = function(app) {
  app.post("/login", userController.userLogin);
  app.post("/signUp", userController.userSignup);
  app.get("/getUser/:userID", userController.getUser);
};
