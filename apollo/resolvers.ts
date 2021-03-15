import { ObjectId } from "mongodb";
import Post from "../model/Post";
import User from "../model/User";
import moment from "moment";
import Comment from "../model/Comment";

export const resolvers = {
  Query: {
    users(_parent, _args, _context, _info) {
      return User.find({});
    },
    posts(_parent, args, _context, _info) {
      return Post.find({}).skip(args.offset).limit(args.limit);
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
    async recommendedPosts(_parent, args, _context, _info) {
      const post = await Post.findById(args.id);
      const recommended1 = await Post.find({
        tags: { $in: [...post.tags] },
        _id: { $ne: new ObjectId(args.id as string) },
      });

      const recommended2 = await Post.find({
        author: post.author,
        _id: { $ne: new ObjectId(args.id as string) },
      });

      const merge = Object.values(
        recommended2.concat(recommended1).reduce((r, o) => {
          r[o.id] = o;
          return r;
        }, {})
      ).slice(
        args.offset ? args.offset : 0,
        args.limit + (args.offset ? args.offset : 0)
      );

      return merge;
    },
    async newPosts(_parent, args, _context, _info) {
      const posts = await Post.find({});

      const newPosts = posts
        .sort((a, b) => moment(b.date).diff(a.date))
        .filter((post) => moment().diff(post.date, "days") <= 7)
        .slice(
          args.offset ? args.offset : 0,
          args.limit + (args.offset ? args.offset : 0)
        );

      return newPosts;
    },
  },
  Comment: {
    async author(parent, _args, _context, _info) {
      return User.findOne({ name: parent.author });
    },
  },
  User: {
    async likedPosts(parent, args, _context, _info) {
      const posts = await Post.find({});
      return posts
        .filter((post) => parent.likedPosts.includes(post._id))
        .slice(
          args.offset ? args.offset : 0,
          args.limit + (args.offset ? args.offset : 0)
        );
    },
    async posts(parent, args, _context, _info) {
      const posts = await Post.find({});
      return posts
        .filter((post) => parent.posts.includes(post._id))
        .slice(
          args.offset ? args.offset : 0,
          args.limit + (args.offset ? args.offset : 0)
        );
    },
  },
  Post: {
    async author(parent, _args, _context, _info) {
      return User.findOne({
        name: parent.author,
      });
    },
    async comments(parent, args, _context, _info) {
      const comments = await Comment.find({});
      return comments
        .sort((a, b) => moment(b.date).unix() - moment(a.date).unix())
        .filter((comment) => parent.comments.includes(comment._id))
        .slice(
          args.offset ? args.offset : 0,
          args.limit + (args.offset ? args.offset : 0)
        );
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
      await User.updateMany(
        { likedPosts: { $in: [new ObjectId(args.postId as string)] } },
        { $pull: { likedPosts: new ObjectId(args.postId as string) } },
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
    async createComment(_parent, args, _context, _info) {
      const comment = await Comment.create(args);

      await Post.findByIdAndUpdate(args.postID, {
        $push: { comments: comment._id },
      });
      return comment;
    },
    async deleteComment(_parent, args, _context, _info) {
      await Comment.deleteOne({ _id: args.commentID });

      await Post.updateOne(
        { comments: { $in: [new ObjectId(args.commentID as string)] } },
        { $pull: { comments: new ObjectId(args.commentID as string) } }
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
