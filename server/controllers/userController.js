const User_details = require("../module/userDetails.js");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const url = require("../config/auth-key.js");

userLogin = (req, res) => {
  let data = req.body;
  User_details.find(
    { email: data.email, password: data.password },
    (err, data) => {
      if (err) {
        throw err;
      } else {
        if (data.length !== 0) {
          // Encrypt user id using cryptr method
          const encryptedUserId = cryptr.encrypt(data[0] && data[0]._id);
          console.log(encryptedUserId);
          res.json([
            {
              id: encryptedUserId,
              access: "granted"
            }
          ]);
        } else if (data.length === 0) {
          // res.send("access_Denied")
          res.json([
            {
              access: "denied"
            }
          ]);
        }
      }
    }
  );
};

userSignup = (req, res) => {
  //   res.send("User add successfully");
  let Sign_data = req.body;
  User_details.find({ email: Sign_data.email }, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.length !== 0) {
        res.json([
          {
            status: "id_Exist"
          }
        ]);
      } else if (data.length === 0) {
        User_details.create(Sign_data, err => {
          if (err) {
            throw err;
          } else {
            res.json([
              {
                status: "success"
              }
            ]);
          }
        });
      }
    }
  });
};
getUser = (req, res) => {
  let userId = req.params ? req.params && req.params.userID : null;
  var decryptedUserId = cryptr.decrypt(userId);
  User_details.find({ _id: decryptedUserId }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const userData = data[0];
      console.log(data);
      res.json([
        {
          data: {
            firstName: userData.first_name,
            lastName: userData.last_name,
            Email: userData.email,
            Phone: userData.phone
          },
          status: {
            Status: 200
          }
        }
      ]);
    }
  });
};
module.exports = { userLogin, userSignup, getUser };
