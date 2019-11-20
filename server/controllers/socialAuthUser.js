const SocialModel = require("../module/authUserDetails.js");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

socialAuthUser = (req, res) => {
  const userId = req.params ? req.params && req.params.id : null;
  console.log("from social Auth", req.params);
  SocialModel.find({ socialID: userId }, (err, data) => {
    if (data.length !== 0) {
      console.log(data);
      res.json([
        {
          id: userId,
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          picture: data[0].picture
        }
      ]);
    } else if (err) {
      console.log("entering catch block");
      console.log(e);
      res.json([
        {
          status: "no data found"
        }
      ]);
      console.log("leaving catch block");
    }
  });
};
module.exports = { socialAuthUser };
