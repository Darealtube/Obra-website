import dbConnect from "./dbConnect";
import User from "../model/User";
import Post from "../model/Post";

export const fetchUser = async (name: string) => {
  await dbConnect();
  try {
    const data = await User.findOne({ name: name });
    if (!data) {
      return null;
    }

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};

export const fetchUserPosts = async (name: string) => {
  await dbConnect();
  try {
    const result = await Post.find({});
    const user = await User.findOne({ name: name });

    if (!user) {
      return null;
    }

    if (user.posts.length <= 0) {
      return null;
    }

    const userPosts = result
      .map((post) => {
        return post.toObject();
      })
      .filter((post) => {
        return user.posts.includes(post._id);
      });

    if (!userPosts) {
      return null;
    }

    return JSON.parse(JSON.stringify(userPosts));
  } catch (error) {
    throw error;
  }
};

export const fetchPosts = async () => {
  await dbConnect();
  try {
    const data = await Post.find({});

    const posts = data.map((data) => {
      const post = data.toObject();
      post._id = post._id.toString();
      return post;
    });

    if (!data) {
      return null;
    }
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    throw error;
  }
};

export const fetchAPost = async (id: string) => {
  await dbConnect();
  try {
    const data = await Post.findOne({ _id: id });
    if (!data) {
      return null;
    }
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};
