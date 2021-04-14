import { ObjectId } from "mongodb";
import Post from "../model/Post";
import User from "../model/User";
import moment from "moment";
import Comment from "../model/Comment";
import History from "../model/History";
import _ from "lodash";
import relayPaginate from "../utils/relayPaginate";

export const resolvers = {
  Query: {
    users(_parent, _args, _context, _info) {
      return User.find({});
    },
    async posts(_parent, args, _context, _info) {
      const posts = await Post.find({});
      const data = relayPaginate(posts, args.after, args.limit);
      return data;
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
      );
      const data = relayPaginate(merge, args.after, args.limit);
      return data;
    },
    async newPosts(_parent, args, _context, _info) {
      const posts = await Post.find({});

      const newPosts = posts
        .sort((a, b) => moment(b.date).diff(a.date))
        .filter((post) => moment().diff(post.date, "days") <= 7);

      const data = relayPaginate(newPosts, args.after, args.limit);
      return data;
    },
    async featuredPosts(_parent, args, _context, _info) {
      const posts = await Post.find({ likes: { $gt: 0 } }); // WILL MODIFY BASED ON WEBSITE'S PERFORMANCE

      const data = relayPaginate(posts, args.after, args.limit);
      return data;
    },
    async isLikedArtist(_parent, args, _context, _info) {
      const user = await User.findById(args.userID);
      const artist = await User.findOne({ name: args.artistName });

      return artist ? user.likedArtists.includes(artist._id) : false;
    },
    async isLikedPost(_parent, args, _context, _info) {
      const user = await User.findById(args.userID);

      return user.likedPosts.includes(args.postID);
    },
  },
  Comment: {
    async author(parent, _args, _context, _info) {
      return User.findById(parent.author);
    },
  },
  User: {
    async likedPosts(parent, args, _context, _info) {
      const posts = await Post.find({});
      const postsArray = posts.filter((post) =>
        parent.likedPosts.includes(post._id)
      );
      const data = relayPaginate(postsArray, args.after, args.limit);
      return data;
    },
    async posts(parent, args, _context, _info) {
      const posts = await Post.find({});
      const postsArray = posts.filter((post) =>
        parent.posts.includes(post._id)
      );
      const data = relayPaginate(postsArray, args.after, args.limit);
      return data;
    },
    async likedArtists(parent, args, _context, _info) {
      const users = await User.find({});
      const usersArray = users.filter((user) =>
        parent.likedArtists.includes(user._id)
      );
      const data = relayPaginate(usersArray, args.after, args.limit);
      return data;
    },
    async homeRecommended(parent, args, _context, _info) {
      const history = await History.find({ userId: parent.id });
      const historyArray = history.map((history) => history.viewed);
      const artists = await User.find({ posts: { $in: historyArray } });
      const artistsPostArray = _.flatten(artists.map((artist) => artist.posts));
      const posts = await Post.find({
        _id: { $in: artistsPostArray, $nin: historyArray },
      });
      const data = relayPaginate(posts, args.after, args.limit);
      return data;
    },
  },
  Post: {
    async author(parent, _args, _context, _info) {
      return User.findById(parent.author);
    },
    async comments(parent, args, _context, _info) {
      const comments = await Comment.find({});
      const commentsArray = comments
        .sort((a, b) => moment(b.date).unix() - moment(a.date).unix())
        .filter((comment) => parent.comments.includes(comment._id));
      const data = relayPaginate(commentsArray, args.after, args.limit);
      return data;
    },
  },
  Mutation: {
    async likePost(_parent, args, _context, _info) {
      await User.findOneAndUpdate(
        { _id: args.userID },
        {
          $addToSet: {
            likedPosts: new ObjectId(args.postId as string) as never,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      await Post.updateOne(
        { _id: args.postId },
        {
          $inc: {
            likes: 1 as never,
          },
        },
        {
          new: true,
        }
      );

      return true;
    },
    async unlikePost(_parent, args, _context, _info) {
      await User.findOneAndUpdate(
        { _id: args.userID },
        {
          $pull: {
            likedPosts: new ObjectId(args.postId as string),
          },
        },
        {
          new: true,
        }
      );
      await Post.updateOne(
        { _id: args.postId },
        {
          $inc: {
            likes: -1 as never,
          },
        },
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
        { _id: post.author },
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
        { _id: post.author },
        // @ts-ignore
        { $push: { posts: post._id } }
      );

      return true;
    },
    async createComment(_parent, args, _context, _info) {
      const comment = await Comment.create(args);

      await Post.findByIdAndUpdate(args.postID, {
        $push: { comments: comment._id as never },
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
    async configUser(_parent, args, _context, _info) {
      await User.findByIdAndUpdate(
        args.userId,
        {
          name: args.name,
          age: args.age,
          country: args.country,
          language: args.language,
          birthday: args.birthday,
          phone: args.phone,
          artLevel: args.artLevel,
          artStyles: args.artStyles,
          artKinds: args.artKinds,
          newUser: false,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return true;
    },
    async editUser(_parent, args, _context, _info) {
      const data = await User.findByIdAndUpdate(
        args.userId,
        {
          name: args.name,
          userBio: args.userBio,
          country: args.country,
          birthday: args.birthday,
          artLevel: args.artLevel,
          artStyles: args.artStyles,
          artKinds: args.artKinds,
          image: args.image,
          backdrop: args.backdrop,
          newUser: false,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return data;
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
    async likeArtist(_parent, args, _context, _info) {
      await User.findOneAndUpdate(
        { _id: args.userID },
        {
          $push: {
            likedArtists: new ObjectId(args.artistID as string) as never,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return true;
    },
    async unlikeArtist(_parent, args, _context, _info) {
      await User.findOneAndUpdate(
        { _id: args.userID },
        { $pull: { likedArtists: new ObjectId(args.artistID as string) } },
        {
          new: true,
        }
      );
      return true;
    },
    async viewPost(_parent, args, _context, _info) {
      await History.findOneAndUpdate(
        { viewed: args.viewed },
        {
          userId: args.userId,
          viewed: args.viewed,
          lastDateViewed: moment().format(),
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
      return true;
    },
  },
};
