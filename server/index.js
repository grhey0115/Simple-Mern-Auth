const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./models/User");

dotenv.config();

const app = express();

// CORS Configuration (MUST be BEFORE other middleware)
const corsOptions = {
  origin: ["https://simple-mern-auths.vercel.app"], // Allow only your frontend URL
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true, // Enable credentials (cookies)
};
app.use(cors(corsOptions));


app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Nodemailer setup (Ensure you have the correct credentials)
const transporter = nodemailer.createTransport({
  service: "gmail", // Or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});


const otpStore = new Map();

// Login route (POST request ONLY)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" }); // 401 Unauthorized
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" }); // 401 Unauthorized
    }

    // Generate and store OTP (Improved security - consider a better OTP solution)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(email, { otp, expiry: expiryTime });
    console.log("Stored OTP for", email, ":", otpStore.get(email));

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Login OTP",
      text: `Your OTP for login is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email" });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Verify OTP route
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("Verifying OTP for email:", email);
    console.log("Received OTP:", otp);

    const storedData = otpStore.get(email);
    console.log("Stored OTP data:", storedData);

    if (!storedData) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (Date.now() > storedData.expiry) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid, generate token
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    otpStore.delete(email);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});


// Route to check OTP store (for debugging)
app.get("/check-otp/:email", (req, res) => {
  const email = req.params.email;
  const storedData = otpStore.get(email);
  res.json({
    exists: !!storedData,
    data: storedData
      ? { hasOTP: !!storedData.otp, expiry: new Date(storedData.expiry) }
      : null,
  });
});


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
