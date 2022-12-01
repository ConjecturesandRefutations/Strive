const { Schema, model } = require("mongoose");

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

module.exports = model("Post", postSchema);
