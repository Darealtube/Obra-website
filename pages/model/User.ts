import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  request_language: String,
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
