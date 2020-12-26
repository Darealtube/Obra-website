module.exports = {
  env: {
    MONGODB_URI: "",
  },
  images: {
    domains: ["picsum.photos", "res.cloudinary.com"],
    //Changes

    //loader: "cloudinary",
    //path: "https://res.cloudinary.com/dyuvjmyfy"

    // I am not sure yet if we shoud include the loader and the path, because
    // somehow, in setArt, the url 'doubles', and I'm still yet to find what the
    // cause is. Also, the side images in index and register will not be loaded.

    //Changes
  },
};
