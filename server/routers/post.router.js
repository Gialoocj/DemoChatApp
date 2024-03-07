const express = require("express");
const path = require("path"); // Import module path
const postRouter = express.Router();
const multer = require("multer");
const postController = require("../controllers/post.controller");
const middlewareToken = require("../controllers/middleware.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

postRouter.route("/create-post").post(
  upload.single("image"),
  // middlewareToken.verifyToken,
  postController.createPost
);

module.exports = postRouter;
