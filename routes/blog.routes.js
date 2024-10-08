const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog.model");
const {
  handleAddBlog,
  handleViewBlog,
  handleUpdateBlog,
  handleAddComment,
  handleDeleteBlog,
} = require("../controllers/blog.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// ------- Served as Frontend. ---------------
router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});
router.get("/update/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  console.log("Blog to Update: ", blog);
  res.render("updateBlog", {
    user: req.user,
    blog,
  });
});
router.get("/delete/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  console.log("Blog to Update: ", blog);
  res.render("deleteBlog", {
    user: req.user,
    blog,
  });
});

// BLOG Controller Routes.
router.post("/", upload.single("coverImage"), handleAddBlog);
router.get("/:blogId", handleViewBlog);
router.post("/update/:blogId", handleUpdateBlog);
router.post("/comment/:blogId", handleAddComment);
router.post("/delete/:blogId", handleDeleteBlog);

module.exports = router;
