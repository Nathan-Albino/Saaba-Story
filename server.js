import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import { connectDatabase } from "./config/db.js";
import { indexRouter } from "./routes/indexRouter.js";
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

//application settings
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");
app.use(express.static("public"));
app.use(expressLayouts);

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
