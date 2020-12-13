const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const randomTokenGenerator = require("@supercharge/strings");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/verifyToken");

//models
const User = require("../models/user");
const EmailToken = require("../models/emailToken");
const Blacklist = require("../models/blacklist");

module.exports = {
  /***************************************       Login      ******************************************/
  /*
  params: email, password
  */
  login: [
    [
      check("email").isEmail().withMessage("Not a valid email."),
      check("password")
        .isLength({ min: 8 })
        .withMessage("Password should be atleast 8 character long.")
        .trim(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
        });
      }
      User.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
          return res.json({
            mssg: "Intenal error while login. Please try again later.",
          });
        }

        if (doc === null) {
          return res.json({
            mssg: "Invalid emailId or password.",
          });
        }

        if (!doc.isEmailVerified) {
          return res.json({
            mssg: "Please verify your email sent on your email address.",
          });
        }

        const passwordIsCorrect = bcrypt.compareSync(
          req.body.password,
          doc.password
        );

        if (passwordIsCorrect) {
          //generate token and send to user
          const token = jwt.sign(
            { userid: doc._id, email: doc.email },
            process.env.JWT_SECRETE_KEY,
            { expiresIn: "1d" }
          );
          return res.json({
            mssg: "Login success",
            token,
          });
        } else {
          return res.josn({
            err: "Incorrect Password.",
          });
        }
      });
    },
  ],
  /*************************************   LOG-OUT   *************************************************/
  /*
  params: token
  */
  logout: (req, res) => {
    const token = req.headers["x-access-token"];
    jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, decode) => {
      if (err) {
        return res.json({
          err: "Error in logout.",
          mssg: err.message,
        });
      }

      //Add token to blacklist
      Blacklist.findOne({ token }, (err, tokenResult) => {
        if (err) {
          return res.json({
            err: "Internal error.",
            mssg: "Error in finding invalid token.",
          });
        }

        if (!tokenResult) {
          new Blacklist({ token }).save((err) => {
            if (err) {
              return res.json({
                err: "Internal error.",
                mssg: "Error in adding invalid token.",
              });
            }

            return res.json({
              mssg: "Logout successful",
            });
          });
        } else {
          return res.json({
            mssg: "Already logged out.",
          });
        }
      });
    });
  },
  /*************************************   REGISTER   *************************************************/
  /*
  params: email, password, mobile, firstName, lastName
  */
  register: [
    //middleware to check for errors in form
    [
      check("email").isEmail(),
      check("password").isLength({ min: 8 }),
      check("firstName").not().isEmpty().trim().escape(),
      check("lastName").not().isEmpty().trim().escape(),
      check("mobile").isMobilePhone("en-IN").not().isEmpty(),
    ],
    //funtion which sends response back to user
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
        });
      }

      //generate hashed password.
      const genPass = bcrypt.hashSync(req.body.password, 10);
      const newuser = {
        email: req.body.email,
        password: genPass,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
      };

      //if user already exist
      User.findOne({ email: req.body.email }, (err, result) => {
        if (err) {
          return res.json({
            status: false,
            err: err.message,
          });
        }

        if (result) {
          return res.json({
            status: false,
            msg: "User already exist",
          });
        }
      });

      EmailToken.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
          return res.json({
            err: "Internal error",
          });
        }

        if (doc) {
          return res.json({
            mssg: "Email already sent to your. Check Your mail.",
          });
        }
      });

      //first try to send email to user
      const emailtoken = new EmailToken({
        email: req.body.email,
        token: randomTokenGenerator.random(50),
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.SENDGRID_USERNAME,
        to: req.body.email,
        subject: "Account Verification Token",
        text:
          "Hello,\n\n" +
          "Please verify your account by clicking the link: \nhttp://" +
          req.headers.host +
          "/auth/email_confirmation/" +
          emailtoken.token +
          ".\n",
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }

        //save token and also create user
        emailtoken.save().catch((err) => {
          if (err)
            return res.json({
              err: err.message,
              msg: "token genearation failed.",
            });
        });
        //if mail sent successfully then create user.
        new User(newuser).save((err, result) => {
          if (err) {
            return res.json({
              errorMsg: "User creation failed.",
              error: err.message,
              status: false,
            });
          }

          const userDetail = {
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            time: result.createdOn,
            mobile: result.mobile,
          };

          return res.json({
            status: true,
            msg: "SuccessFully registered. First verify your email to login",
            userDetail,
          });
        });
      });
    },
  ],
  /**********************************     Current User Info      ************************************/
  /*
  method : get,  header = x-access-token: token
  */
  getCurrentUser: [
    verifyToken,
    (req, res) => {
      const token = req.headers["x-access-token"];
      jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, decode) => {
        if (err) {
          return res.json({
            err: "Error in decoding token",
            mssg: err.message,
          });
        }

        Blacklist.findOne({ token }, (err, invalidToken) => {
          if (err) {
            return res.json({
              err: "Internal error.",
              mssg: "Error while finding token in blacklist.",
            });
          }

          if (invalidToken) {
            return res.json({
              err: "Invalid token found.",
              mssg: "Please Re-login to get new token.",
            });
          } else {
            User.findOne(
              { _id: decode.userid },
              { password: 0, _v: 0, _id: 0 },
              (err, doc) => {
                if (err) {
                  return res.json({
                    err: "Error in retrieving user data.",
                  });
                }

                if (!doc) {
                  return res.json({
                    err: "Invalid token.",
                  });
                }

                return res.json({
                  mssg: "User data successfully Retrieved.",
                  user: doc,
                });
              }
            );
          }
        });
      });
    },
  ],
  /**********************************     email confirmation      ************************************/
  /*
  method : get, (no params)
  */
  emailConfirmation: (req, res) => {
    const token = req.params["token"];
    EmailToken.findOne({ token }, (err, doc) => {
      if (err) {
        return res.json({
          mssg: "Invalid token.",
        });
      }
      if (doc === null) {
        return res.json({
          mssg: "Token is Invalid.",
        });
      }

      User.findOne({ email: doc.email }, (err, result) => {
        if (err) {
          return res.json({
            mssg: "Internal error. Please try again later.",
          });
        }
        if (result === null) {
          if (err) {
            return res.json({
              mssg: "No token found.",
            });
          }
        }
        EmailToken.deleteOne({ token }, (err) => {
          if (err) {
            return res.json({
              mssg: "Internal error.",
            });
          }

          result.isEmailVerified = true;
          result.save((err) => {
            if (err) {
              return res.json({
                mssg: "Internal error. Please try again later.",
              });
            }
            return res.json({
              mssg: "Email verified successfully",
            });
          });
        });
      });
    });
  },

  /**********************************     Reset Password      ************************************/
  /*
    params: email, old_password, new_password
  */
  resetPassword: [
    [
      check("email").isEmail().withMessage("Not a valid email."),
      check("old_password")
        .isLength({ min: 8 })
        .withMessage("Password should be atleast 8 character long.")
        .trim(),
      check("new_password")
        .isLength({ min: 8 })
        .withMessage("Password should be atleast 8 character long.")
        .trim(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
        });
      }
      User.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
          return res.json({
            mssg: "Intenal error while login. Please try again later.",
          });
        }

        if (doc === null) {
          return res.json({
            mssg: "Invalid emailId",
          });
        }

        if (!doc.isEmailVerified) {
          return res.json({
            mssg: "Please first verify your email sent on your email address.",
          });
        }

        const samePassword = bcrypt.compareSync(
          req.body.new_password,
          doc.password
        );
        if (samePassword) {
          return res.json({
            mssg: "Please do not use same password to reset.",
          });
        }

        const passwordIsCorrect = bcrypt.compareSync(
          req.body.old_password,
          doc.password
        );

        if (passwordIsCorrect) {
          doc.password = bcrypt.hashSync(req.body.new_password, 10);
          doc.save((err) => {
            if (err) {
              return res.json({
                mssg: "Internal error.",
              });
            }

            return res.json({
              mssg: "Password reset successfully",
            });
          });
        } else {
          return res.json({
            mssg: "Incorrect Password.",
          });
        }
      });
    },
  ],
  /**********************************     Update Profile      ************************************/
  /*
    params: email, firstName, lastName, mobile
  */
  updateUser: [
    [
      check("email").isEmail(),
      check("firstName").not().isEmpty().trim().escape(),
      check("lastName").not().isEmpty().trim().escape(),
      check("mobile").isMobilePhone("en-IN").not().isEmpty(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
        });
      }
      User.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
          return res.json({
            err: "Internal error",
          });
        }

        if (doc === null) {
          return res.json({
            mssg: "Email does not exist.",
          });
        }

        doc.firstName = req.body.firstName;
        doc.lastName = req.body.lastName;
        doc.mobile = req.body.mobile;

        doc.save((err, doc) => {
          if (err) {
            return res.json({
              err: "Internal error",
            });
          }

          const updatedUser = {
            email: doc.email,
            firstName: doc.firstName,
            lastName: doc.lastName,
            mobile: doc.mobile,
          };

          return res.json({
            mssg: "Successfully updated.",
            updateUserInfo: updatedUser,
          });
        });
      });
    },
  ],
  /**********************************     Delete Profile      ************************************/
  /*
    params: email
  */
  deleteUser: [
    [check("email").isEmail()],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
        });
      }

      User.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
          return res.json({
            err: "Cannot delete user at this time.",
          });
        }

        if (doc) {
          User.deleteOne({ email: req.body.email }, (err) => {
            if (err) {
              return res.json({
                err: "Cannot delete user at this time.",
              });
            }

            return res.json({
              mssg: "Account deleted successfully.",
            });
          });
        } else {
          return res.json({
            mssg: "Email is not valid",
          });
        }
      });
    },
  ],
};
