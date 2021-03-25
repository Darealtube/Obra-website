import mongoose from "mongoose";
import moment from "moment";

const now = () => {
  return moment().format();
};

const CommentSchema = new mongoose.Schema({
  postID: mongoose.Schema.Types.ObjectId,
  author: mongoose.Schema.Types.ObjectId,
  date: {
    type: String,
    default: now,
  },
  content: String,
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
