const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    age: Number,
    totalActivities: Number,
    totalTimeExercising: Number,
    favoriteActivites: { type: String, enum: ['run', 'bike', 'swim', 'walk', 'other'] },
    shoes: [String],
    bikes: [String]
  },
    {
      username: {
        type: String,
        trim: true,
        required: false,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      }
    },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
