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
      return User.findById(args.id);
    },
    userName(_parent, args, _context, _info) {
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
  Post: {
    async author(parent, _args, _context, _info) {
      return User.findOne({
        name: parent.author,
      });
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
    async deletePost(_parent, args, _context, _info) {
      const post = await Post.findById(args.postId);
      await Post.deleteOne({ _id: args.postId });
      await User.findOneAndUpdate(
        { name: post.author },
        { $pull: { posts: new ObjectId(args.postId as string) } },
        {
          new: true,
        }
      );
      return true;
    },
    async createPost(_parent, args, _context, _info) {
      const post = await Post.create(args); // from body (for now)

      await User.findOneAndUpdate(
        { name: post.author },
        // @ts-ignore
        { $push: { posts: post._id } }
      );

      return true;
    },
    async editUser(_parent, args, _context, _info) {
      await User.findByIdAndUpdate(
        args.userId,
        {
          username: args.username,
          age: args.age,
          country: args.country,
          language: args.language,
          birthday: args.birthday,
          phone: args.phone,
          newUser: false,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return true;
    },
    async readNotif(_parent, args, _context, _info) {
      await User.findByIdAndUpdate(
        args.userId,
        {
          notifRead: true,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return true;
    },
  },
};
