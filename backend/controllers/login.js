import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "20s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN,
      { expiresIn: "10m" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    const userId = foundUser._id;

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ userId, accessToken });
  } else {
    res.sendStatus(401);
  }
};

export default { handleLogin };
