const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: String,
    distanceInKilometers: Number,
    timeInMinutes: Number,
    elevationGain: Number,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
