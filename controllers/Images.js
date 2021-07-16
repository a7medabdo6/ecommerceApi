exports.ImagesController = async (req, res) => {
  console.log(req.files, "images");
};
exports.getAllIMages = async (req, res) => {
  res.send("images 22");
};
