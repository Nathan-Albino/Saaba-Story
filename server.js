import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";

import { connectDatabase } from "./config/db.js";
import { indexRouter } from "./routes/indexRouter.js";
import { userRouter } from "./routes/userRouter.js";
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

//application settings
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");
app.use(express.static("public"));
app.use(expressLayouts);
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
  })
);

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
