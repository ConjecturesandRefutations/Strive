const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    age: Number,
    favoriteActivites: {
      type: String,
      enum: ["run", "bike", "swim", "walk", "other"],
    },
    shoes: [String],
    bikes: [String],
    profileImage: String,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
