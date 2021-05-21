module.exports = {
  poweredByHeader: false,
  images: {
    domains: [
      "picsum.photos",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
    ],
  },
  routes: [
    {
      src: "/.*",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Content-Type-Options": "nosniff",
        "X-XSS-Protection": "1",
      },
      continue: true,
    },
  ],
};
