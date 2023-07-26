const blogService = require("../services/blogService");

async function createBlog(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  try {
    const data = await blogService.createBlog({ title, content });
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error creating blog" + error });
  }
}

async function getAllBlogs(req, res) {
  try {
    const data = await blogService.getAllBlog();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error getting all blog" + error });
  }
}

async function getBlogId(req, res) {
  const id = req.params.id;
  try {
    const data = await blogService.getById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error getting blog by id" + error });
  }
}

async function updateBlog(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  const id = req.params.id;
  try {
    const data = await blogService.update(id, { title, content });
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error creating blog" + error });
  }
}

async function deleteBlog(req, res) {
  const id = req.params.id;
  try {
    const data = await blogService.deleteBlog(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error deleting blog" + error });
  }
}

module.exports = { createBlog, getAllBlogs, getBlogId, updateBlog, deleteBlog };
