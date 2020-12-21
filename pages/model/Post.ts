import mongoose from "mongoose";
import moment from "moment";

const PostSchema = new mongoose.Schema({
  author: String,
  date: {
    type: String,
    default: moment().format("l"),
  },
  sale: Boolean,
  price: String,
  image: String,
  tags: Array,
  title: {
    type: String,
    required: true,
    maxlength: [40, "Title is too long!"],
  },
  description: {
    type: String,
    required: true,
    maxLength: [400, "Explain it more briefly."],
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
