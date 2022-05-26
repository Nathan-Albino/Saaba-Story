import express from "express";
import { Story } from "../models/story.js";
import moment from "moment";

//dashboard Router
const router = express.Router();

//dashboard GET route
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.user.id,
    }).sort({
      createdAt: "desc"
    });

    res.render("dashboard", {
      layout: "layouts/main",
      name: req.user.username,
      stories: stories,
      moment: moment,
    });
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

//add story GET route
router.get("/add", (req, res) => {
  res.render("stories/add", {
    layout: "layouts/main",
  });
});

// add story POST route
router.post("/add", async (req, res) => {
  const story = new Story({
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    user: req.user.id,
  });

  try {
    await story.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard/add");
  }
});

export { router as dashboardRouter };
