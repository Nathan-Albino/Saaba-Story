import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";

import { connectDatabase } from "./config/db.js";
import { indexRouter } from "./routes/indexRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { passportConfig } from "./config/passport.js";
import { User } from "./models/user.js";


dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

//application settings
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(expressLayouts);
app.use(methodOverride('_method'))
app.use(flash());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
  })
);

// Passport Config
app.use(passport.authenticate("session")); //alters req.user property with the authenticated user and adds methods such as isAuthenticated
//we now have req.isAuthenticated at every request
passportConfig(passport);

passport.serializeUser((user, done) => {
  done(null, { _id: user.id, username: user.username });
});

//called directly after serializeUser
passport.deserializeUser((user, done) => {
  User.findById(user, (err, user) => {
    done(err, user); //set the req.user to user HERE
  });
});

//logging - DEV ONLY
app.use(morgan("dev"));

//listen at port PORT after DB connected
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

//routes
app.use("/", indexRouter);

app.use("/user", userRouter);
