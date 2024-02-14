const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

//SIGN UP

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User Already Exists" });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "Sign Up Successful" });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Internal Server Error" });
  }
});

//SIGN IN

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: "Please Sign Up First" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({ message: "Incorrect password" });
    }

    //Login Successfull

    const { password: userPassword, ...userDetails } = user._doc;
    res.status(200).json({ user: userDetails });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "User Already Exists",
    });
  }
});

module.exports = router;
