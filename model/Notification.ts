import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  commissionId: mongoose.Schema.Types.ObjectId,
  commissioner: mongoose.Schema.Types.ObjectId,
  date: String,
  description: String,
  read: Boolean,
});

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
