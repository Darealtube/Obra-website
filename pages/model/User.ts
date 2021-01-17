import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  sub: String,
  picture: String,
  email: String,
  email_verified: Boolean,
  posts: Array,
  likedPosts: Array,
  likedArtists: Array,
  balance: String,
  notifications: Array,
  avatar: String,
  // More to come
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
