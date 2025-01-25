import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    description: {
      type: String,
      default: 'Hi there! I am using Blogfolio!'
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    refreshToken: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
