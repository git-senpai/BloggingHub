const express = require("express");
const { createPost, getAllPosts, getPostById, updatePost,deletePost } = require("../controllers/postController");
const uploadMiddleware = require("../middleware/multerMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, uploadMiddleware.single("file"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/", authMiddleware, uploadMiddleware.single("file"), updatePost);
router.delete("/:id", authMiddleware, deletePost);


module.exports = router;
