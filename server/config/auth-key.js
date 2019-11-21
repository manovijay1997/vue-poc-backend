if (process.env.NODE_ENV === "production") {
  console.log("produ");
  module.exports = require("./prodConfig/prodAuthKey.js");
} else {
  console.log("devel");
  module.exports = require("./devConfig/devAuthKey.js");
}
