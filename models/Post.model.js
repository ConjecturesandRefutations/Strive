const { Schema, model } = require('mongoose');
 
const postSchema = new Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    title: String,
    distanceInKilometers: Number,
    timeInMinutes: Number,
    elevationGain: Number
  },
  {
    timestamps: true
  }
);
 
module.exports = model('Post', postSchema);