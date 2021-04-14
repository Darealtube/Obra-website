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
  age: String,
  country: String,
  birthday: String,
  phone: String,
  newUser: Boolean,
  notifRead: Boolean,
  artLevel: String,
  artStyles: Array,
  artKinds: Array,
  userBio: String,
  backdrop: String,
  // More to come
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
