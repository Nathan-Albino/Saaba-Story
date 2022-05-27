import mongoose from "mongoose";

const { Schema } = mongoose;

const storySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    default: "Public",
    enum: ["Public", "Private"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Story = mongoose.model("Story", storySchema);

export { Story };
