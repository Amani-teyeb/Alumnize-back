const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  // slug: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  level: {
    type: String,
  },
  image: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Theme", themeSchema);
