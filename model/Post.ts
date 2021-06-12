import mongoose from "mongoose";
import moment from "moment";

const PostSchema = new mongoose.Schema({
  author: mongoose.Schema.Types.ObjectId,
  date: {
    type: String,
    default: moment().format("l"),
  },
  sale: String,
  price: String,
  art: String,
  tags: Array,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: Array,
  forSale: Boolean,
  forSalePrice: String,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
