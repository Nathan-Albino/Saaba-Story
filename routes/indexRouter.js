import express from "express";

//index Router
const router = express.Router();

// Login / Landing Page Route
router.get("/", (req, res) => {
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
