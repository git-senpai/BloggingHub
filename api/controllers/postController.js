const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");

// Create Post
const createPost = async (req, res) => {
  try {
    const { file } = req;
    const { token } = req.cookies;
    
    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Verify JWT
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) return res.status(403).json({ msg: "Invalid token" });

      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: "posts" },
        (error, result) => {
          if (error) {
            return res.status(500).json({ msg: "Image upload failed", error });
          }
          // Create the post after successful image upload
          const { title, summary, content } = req.body;
          Post.create({
            title,
            summary,
            content,
            cover: result.secure_url,  // Use the secure URL from Cloudinary
            author: info.id,
          }).then((post) => res.json(post));
        }
      ).end(file.buffer);  // Upload image from memory buffer
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get All Posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 }).limit(20);
  res.json(posts);
};

// Get Single Post
const getPostById = async (req, res) => {
  const { id } = req.params;
  Post.findById(id).populate("author", "username").then(post => {
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  }).catch(err => res.status(500).json({ msg: "Server error" }));
};

// Update Post
const updatePost = async (req, res) => {
  let newImageUrl = null;
  
  if (req.file) {
    // Upload new image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "posts" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      ).end(req.file.buffer);
    });
    newImageUrl = uploadResult;
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    if (postDoc.author.toString() !== info.id) {
      return res.status(400).json("You are not the author");
    }
    
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newImageUrl ? newImageUrl : postDoc.cover,
    });
    
    res.json(postDoc);
  });
};

// Delete Post
const deletePost = async (req, res) => {
  const { id } = req.params; // Post ID
  const { token } = req.cookies;

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });

    try {
      const postDoc = await Post.findById(id);

      // Check if the logged-in user is the author of the post
      if (!postDoc || postDoc.author.toString() !== info.id) {
        return res.status(400).json("You are not authorized to delete this post");
      }

      // Delete the post
      await Post.findByIdAndDelete(id);

      res.json({ msg: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error });
    }
  });
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };

