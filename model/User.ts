import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  image: String,
  email: String,
  posts: Array,
  likedPosts: Array,
  likedArtists: Array,
  balance: String,
  notifications: Array,
  tutorial: {
    type: Boolean,
    default: true,
  },
  name: String,
  // More to come
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
