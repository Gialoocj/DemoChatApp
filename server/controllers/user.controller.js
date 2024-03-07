const User = require("../models/user.model");
// const { param } = require("../routers/user.router");

const getAllUsers = async (req, res, next) => {
  const _users = await User.find(
    {},
    { createdAt: 0, updatedAt: 0, __v: 0, password: 0 }
  ).exec();
  if (!_users)
    return res
      .status(400)
      .json({ message: "Không tìm thấy danh sách người dùng", success: false });
  try {
    return res.status(200).json({
      message: "Lấy danh sách người dùng thành công",
      success: true,
      data: _users,
    });
  } catch (error) {
    console.log("Lỗi server");
  }
};

const deleteUser = async (req, res, next) => {
  const _userid = req.params.userid;
  const _user = await User.findByIdAndDelete(_userid);
  if (!_user)
    return res.json({ message: "Không tìm thấy người dùng", success: false });
  return res.json({ message: "Xóa người dùng thành công", success: true });
};

module.exports = { getAllUsers, deleteUser };
