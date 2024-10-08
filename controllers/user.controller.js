const User = require("../models/user.model");

async function handleUserSignup(req, res) {
  const { fullName, email, password } = req.body;
  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });
  if (existedUser) {
    return res.render("signup", {
      error: "Users with email or username already exist.",
    });
  }

  await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (e) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
}

function handleUserLogout(res, res) {
  return res.clearCookie("token").redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserSignin,
  handleUserLogout,
};
