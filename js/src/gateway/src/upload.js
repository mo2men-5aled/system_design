const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const Grid = require("gridfs-stream");

const publishMessage = require("./rabbitmq/producer");
//Middleware

const mongoURI =
  "mongodb+srv://momen:mo2men@cluster0.gtplyfa.mongodb.net/mongouploads";

const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once("open", () => {
  console.log("MongoDB database connection established successfully");
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const fileInfo = {
          filename: file.originalname,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const up = multer({ storage });

const upload = async (req, res) => {
  if (req.user.admin) {
    up.single("file")(req, res, (err) => {
      const message = {
        video_id: req.file.id,
        mp3_id: undefined,
        username: req.user.username,
      };
      if (err) {
        res.json({ msg: "Error uploading file" });
      } else {
        publishMessage("video", message);
        res.json({
          msg: "File uploaded successfully",
          file: req.file,
          message,
        });
      }
    });
  } else {
    res.json({ msg: "Unauthorized" });
  }
};
module.exports = upload;
