const express = require("express");

const router = express();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const { requireSignin, adminMiddleware } = require("../common-middleware");
const { addTheme, getThemes } = require("../controllers/theme");

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/theme/create", upload.single("image"), addTheme);
router.get("/theme/getTheme", getThemes);
module.exports = router;
