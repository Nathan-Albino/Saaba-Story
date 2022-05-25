import express from "express";
import { isAuth } from "../routes/auth.js";
import { dashboardRouter } from "./dashboardRouter.js";
import { isLogged } from "./auth.js";
//index Router
const router = express.Router();

// Landing Page Route
router.get("/", isLogged, (req, res) => {
  res.render("home", {
    layout: "layouts/login",
    messages: req.flash("info"),
  });
});

// Dashboard Route - Protected with isAuth()
router.use("/dashboard", isAuth, dashboardRouter);

export { router as indexRouter };
