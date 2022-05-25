import express from "express";
import { isAuth } from "../routes/auth.js";

//index Router
const router = express.Router();

// Landing Page Route
router.get("/", (req, res) => {
  res.render("home", {
    layout: "layouts/login",
    messages: req.flash("info"),
  });
});

// Dashboard Route
router.get("/dashboard", isAuth, (req, res) => {
  res.render("dashboard", {
    layout: "layouts/main",
  });
});

router.get("/flash", function (req, res) {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash("info", "Flash is back!");
  res.redirect("/");
});

export { router as indexRouter };
