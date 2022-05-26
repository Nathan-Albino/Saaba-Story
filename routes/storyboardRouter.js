import express from "express";
import { Story } from "../models/story.js";
import { truncateBody } from "../helpers/helper.js";
import moment from "moment";

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

router.get("/:id", async(req, res) => {
    
    try {
        const story = await Story.findById(req.params.id).populate("user", "username");

        res.render("stories/singlePage", {
            layout: "layouts/main",
            story: story,
            truncateBody,
            moment
        })

    } catch (error) {
        res.send("Page not found")
    }

    

})

//Storyboard edit story GET route
router.get("/edit/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (req.user.id != story.user) {
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


    try {
        const story = await Story.findById(req.params.id);

        if (req.user.id != story.user) {
            res.redirect("/dashboard");
        } else {
            await Story.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                body: req.body.body,
                status:req.body.status
            }, {
                new: true,
                runValidators: true
            })

            res.redirect("/dashboard");
        }
    } catch (error) {
        res.send("Something went wrong")
    }

})

//Storyboard delete story DELETE Route
router.delete("/delete/:id", async (req, res) => {
    try {
        await Story.deleteOne({
            _id: req.params.id
        })

        res.redirect("/dashboard");

    } catch (error) {
        res.send("Something went wrong")
    }
})

export { router as storyboardRouter };
