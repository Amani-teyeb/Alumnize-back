const Theme = require("../models/theme");

exports.addTheme = (req, res) => {
  const themeObj = {
    name: req.body.name,
    level: req.body.level,
  };
  if (req.file) {
    themeObj.image = process.env.API + "/public/" + req.file.filename;
  }

  const them = new Theme(themeObj);
  them.save((error, theme) => {
    if (error) return res.status(400).json({ error });
    if (theme) {
      return res.status(201).json({ theme });
    }
  });
};

exports.getThemes = (req, res) => {
  Theme.find({}).exec((error, themes) => {
    if (error) return res.status(400).json({ error });
    if (themes) return res.status(201).json({ themes });
  });
};
