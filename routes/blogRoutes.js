const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const { verifyJwtToken } = require("../middlewares/authVerification");

router.post("/", verifyJwtToken, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogId);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
