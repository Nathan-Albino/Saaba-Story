import express from "express";

//index Router
const router = express.Router();

// Landing Page Route
router.get("/", (req, res) => {
  res.render("home", {
    layout: "layouts/login",
  });
});

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
  });
});

// Dashboard Route
router.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    layout: "layouts/main",
  });
});

export { router as indexRouter };
