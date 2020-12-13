const router = require("express").Router();
const authController = require("../controllers/auth");

router.all("/", (req, res) => {
  return res.json({
    mssg: "Auth section",
  });
});

//param: email, password
router.post("/login", authController.login);

//params: email, password, mobile, firstName, lastName
router.post("/register", authController.register);

//header    x-access-token: token
router.post("/logout", authController.logout);

//header x-access-token: token
router.get("/getCurrentUser", authController.getCurrentUser);

router.get("/email_confirmation/:token", authController.emailConfirmation);

//params: email, old_password, new_password
router.put("/reset-password", authController.resetPassword);

//params: email, firstName, lastName, mobile
router.put("/update", authController.updateUser);

//params: email
router.delete("/delete", authController.deleteUser);

module.exports = router;
