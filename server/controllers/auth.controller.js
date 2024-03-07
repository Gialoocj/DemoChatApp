const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokenArr = [];

const registerAuth = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Tên đã được sử dụng" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "30s",
    });

    res
      .status(201)
      .json({ message: "Đăng ký thành công", token, data: newUser });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    res
      .status(500)
      .json({ message: "Đăng ký không thành công, vui lòng thử lại sau" });
  }
};

const loginAuth = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne(
      { email },
      { createdAt: 0, updatedAt: 0, __v: 0, email: 0 }
    ).exec();

    if (!user) {
      return res.status(401).json({
        message: "Thông tin đăng nhập không chính xác",
        success: false,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Thông tin đăng nhập không chính xác",
        success: false,
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30d",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "30d",
      }
    );

    refreshTokenArr.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    return res.status(200).json({ accessToken, data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const requestRefreshToken = async (req, res) => {
  // Lấy refreshToken từ user
  const tokenFromCookie = req.cookies.refreshToken;
  if (!tokenFromCookie)
    return res.status(401).json({ message: "Bạn chưa xác thực" });
  if (!refreshTokenArr.includes(tokenFromCookie))
    return res.status(403).json({ message: "Token không đúng" });
  jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Token không hợp lệ" });
    }

    // Tạo một access token mới
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN,
      { expiresIn: "30s" }
    );

    // Tạo một refresh token mới
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      process.env.REFRESH_TOKEN,
      { expiresIn: "30d" }
    );

    // Gửi refresh token mới về cho client
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    return res.status(200).json({ accessToken: newAccessToken });
  });
};

const logOut = async (req, res) => {
  res.clearCookie("refreshToken");
  const refreshTokens = refreshTokenArr.filter(
    (token) => token !== req.cookies.refreshToken
  );
  return res.status(200).json({ message: "Log out successfully" });
};

module.exports = { registerAuth, loginAuth, requestRefreshToken, logOut };
