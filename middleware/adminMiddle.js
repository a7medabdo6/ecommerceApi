exports.adminMiddleware = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    return res.status(400).json({ msg: "Access denied!" });
  }
  next();
};
