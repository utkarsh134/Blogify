const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

async function handleAddBlog(req, res) {
  const { title, body } = req.body;
  const userId = req.user._id;
  //   console.log("Blog created by user with userId: ", userId);
  const blog = await Blog.create({
    title,
    body,
    createdBy: userId,
    coverImageURL: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
}

async function handleViewBlog(req, res) {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId).populate("createdBy");
  const comments = await Comment.find({ blogId: blogId }).populate("createdBy");
  //   console.log(blog);
  console.log("comments", comments);
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
}

async function handleUpdateBlog(req, res) {
  const { blogId } = req.params;
  const { newTitle, newBody } = req.body;
  const blog = await Blog.findById(blogId);

  blog.title = newTitle;
  blog.body = newBody;
  const updatedBlog = await blog.save();

  // console.log("UpdatedBlog: ", updatedBlog);
  return res.redirect("/");
}

async function handleAddComment(req, res) {
  const { blogId } = req.params;
  await Comment.create({
    content: req.body.content,
    createdBy: req.user._id,
    blogId: blogId,
  });

  return res.redirect(`/blog/${blogId}`);
}

async function handleDeleteBlog(req, res) {
  const { blogId } = req.params;
  const deletedBlog = await Blog.findByIdAndDelete(blogId);
  return res.redirect("/");
}

module.exports = {
  handleAddBlog,
  handleViewBlog,
  handleUpdateBlog,
  handleAddComment,
  handleDeleteBlog,
};
