const Post = require("../models/post.model");
const User = require("../models/user.model");

const createPost = async (req, res) => {
  try {
    const _user = await User.findById(req.body.userId);
    if (!_user) return res.status(404).json("Không thể tìm thấy người dùng");
    if (!req.file) return res.status(400).json("Không có tệp được tải lên");
    const newPost = new Post({
      userId: req.body.userId,
      image: req.file.path,
      title: req.body.title,
      likeNumber: req.body.likeNumber,
    });
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost };
