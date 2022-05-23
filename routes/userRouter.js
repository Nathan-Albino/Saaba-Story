import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

// user Router
const router = express.Router();

// Register Page Route
router.get("/register", (req, res) => {
  res.render("register", {
    layout: "layouts/login",
  });
});

// Login Page Route
router.get("/login", (req, res) => {
  res.render("login", {
    layout: "layouts/login",
    login_message: req.flash("success_msg"),
  });
});

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const errors = [];

  if (!username || !password) {
    errors.push("Please Fill in All Fields");
  }

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      username: username,
      password: password,
      layout: "layouts/login",
    });
  } else {
    const user = await User.findOne({ username: username });

    if (user) {
      errors.push("User already Exists");
      res.render("register", {
        errors: errors,
        username: username,
        password: password,
        layout: "layouts/login",
      });
    } else {
      // Hash Password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            throw err;
          }

          const newUser = new User({
            username: username,
            password: hash,
          });

          try {
            await newUser.save();

            req.flash(
              "success_msg",
              "you are now registered and can now login"
            );
            res.redirect("/user/login");
          } catch (err) {
            console.log(err);
            res.send("an error has occurred");
          }
        });
      });
    }
  }
});

export { router as userRouter };
