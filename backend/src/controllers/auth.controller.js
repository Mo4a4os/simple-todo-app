import { generateToken } from "../lib/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "fill all of fields" });
  }
  try {
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be 6+" });
    }
    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ message: "Username already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.error("error at creating user", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid cred." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid cred." });
    }
     generateToken(user._id, res);
      res.status(200).json({
        _id:user.id,
        username:user.username
      })
  } catch (error) {
    console.error("error in login");
    res.status(500).json({ message: "internal error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message:"logged out"})
  } catch (error) {
    console.log('error', error.message)
    res.status(500).json({message:"internal error"})
  }
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
res.status(500)
  }
}