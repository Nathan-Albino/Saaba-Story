import express from "express";

//dashboard Router
const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard", {
    layout: "layouts/main",
  });
});

export { router as dashboardRouter };
