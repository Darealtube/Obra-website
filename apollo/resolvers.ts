import { ObjectId } from "mongodb";
import Post from "../model/Post";
import User from "../model/User";

export const resolvers = {
  Query: {
    users(_parent, _args, _context, _info) {
      return User.find({});
    },
    posts(_parent, _args, _context, _info) {
      return Post.find({});
    },
    userId(_parent, args, _context, _info) {
      return User.findOne({ name: args.name });
    },
    postId(_parent, args, _context, _info) {
      return Post.findById(args.id);
    },
  },
  User: {
    async likedPosts(parent, _args, _context, _info) {
      const posts = await Post.find({});
      return posts.filter((post) => parent.likedPosts.includes(post._id));
    },
    async posts(parent, _args, _context, _info) {
      const posts = await Post.find({});
      return posts.filter((post) => parent.posts.includes(post._id));
    },
  },
  Mutation: {
    async likePost(_parent, args, _context, _info) {
      const res = await User.findOneAndUpdate(
        { name: args.userName },
        { $push: { likedPosts: new ObjectId(args.postId as string) } },
        {
          new: true,
          runValidators: true,
        }
      );
      return true;
    },
    async unlikePost(_parent, args, _context, _info) {
      const res = await User.findOneAndUpdate(
        { name: args.userName },
        { $pull: { likedPosts: new ObjectId(args.postId as string) } },
        {
          new: true,
        }
      );
      return true;
    },
    async editPost(_parent, args, _context, _info) {
      const post = await Post.findOneAndUpdate(
        { _id: args.postId },
        { title: args.title, description: args.description, tags: args.tags },
        {
          new: true,
        }
      );
      return true;
    },
  },
};
