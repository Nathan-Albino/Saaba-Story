import express from "express";
import { Story } from "../models/story.js";
import { truncateBody } from "../helpers/helper.js";

//storyBoard Router
const router = express.Router();

//Storyboard page route
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find({
      status: "Public",
    })
      .populate("user")
      .sort({
        createdAt: "desc",
      });

    res.render("storyboard", {
      layout: "layouts/main",
      stories: stories,
      truncateBody: truncateBody,
      user_id: req.user.id,
    });
  } catch (error) {
    console.log(error);
  }
});

//Storyboard edit story GET route
router.get("/edit/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (req.user.id != story.user.toString()) {
      res.redirect("/dashboard");
    } else {
      res.render("stories/edit", {
        layout: "layouts/main",
        story: story,
        truncateBody: truncateBody,
      });
    }
  } catch (error) {
    res.send("This story does not exist");
  }
});

//Storyboard edit story PUT route
router.put("/edit/:id", async (req, res) => {
    res.send("put request successful")
})

export { router as storyboardRouter };
