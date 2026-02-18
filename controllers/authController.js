const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.create({
      name,
      email,
      password, // plain password (learning purpose)
      role: role || "student",
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 SIMPLE PASSWORD CHECK (NO BCRYPT)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 JWT SECRET (REQUIRED)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "mysecretkey", // simple secret for now
      { expiresIn: "1d" },
    );

    res.json({
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
};
