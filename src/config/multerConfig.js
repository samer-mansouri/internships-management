const multer = require("multer");
const path = require("path");

// Function to generate a random string for file names
const generateRandomName = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Specify the destination directory here
  },
  filename: (req, file, cb) => {
    const randomName = generateRandomName();
    const extension = path.extname(file.originalname);
    const fileName = `${randomName}${extension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  // Get the file size
  const fileSize = file.size;

  let ext = path.extname(file.originalname);
  if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
    cb(new Error("File type is not supported"), false);
    return;
  }

  // Pass the original name and size to the request object
  req.uploadedFileName = file.originalname;
  req.fileSize = fileSize;

  cb(null, true);
};

const multerConfig = multer({
  storage,
  fileFilter,
});

module.exports = multerConfig;
