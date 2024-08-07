import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, minLength: 6 },
    profilePic: { type: String, default: "" },
    //posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: String,default:[] }],
    following: [{ type: String,default:[] }],
    isFrozen:{
      type: Boolean,
      default: false
    },
    bio:{
        type: String,
        default: ""
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User
