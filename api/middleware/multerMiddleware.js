const multer = require('multer');

// Store file in memory
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
