const users = require("../data/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }

  let userIdx = users.findIndex((x) => x.username == username);
  if (userIdx < 0) {
    return res.status(400).json({ message: "user not found" });
  }

  let user = users[userIdx];
  if (user.password != password) {
    return res.status(400).json({ message: "password wrong" });
  }

  const accessToken = jwt.sign(
    { username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  delete user.password;
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ message: "success login", user, accessToken });
};

module.exports = {
  login,
};
