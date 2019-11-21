const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;
const passport = require("passport");
const morgan = require("morgan");
require("./server/controllers/passportAuth");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(require("cookie-parser")());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// <---------------------------connection--------------------------------->
const db = require("./server/config/auth-key.js");
mongoose.connect(db.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./server/routes/index.js")(app);
require("./server/routes/passport-auth.js")(app);
require("./server/routes/socialUser.js")(app);
app.get("/", (req, res) => {
  res.send("sending from back end");
});

app.listen(port, () => {
  console.log("server running", port);
});
