const express = require("express");
const path = require("path");
const connectMongoDB = require("./db/index.js");
const cookieParser = require("cookie-parser");
require('dotenv').config()

const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/auth.middleware.js");
const Blog = require("./models/blog.model.js");


const app = express();
connectMongoDB();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
