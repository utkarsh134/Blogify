const { Router } = require("express");
const {
  handleUserSignup,
  handleUserSignin,
  handleUserLogout,
} = require("../controllers/user.controller");

const router = Router();

// Served as Frontend.
router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

// USER Controller Routes.
router.post("/signup", handleUserSignup);
router.post("/signin", handleUserSignin);
router.get("/logout", handleUserLogout);

module.exports = router;
