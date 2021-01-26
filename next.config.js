module.exports = {
  poweredByHeader: false,
  images: {
    domains: [
      "picsum.photos",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
  routes: [
    {
      src: "/.*",
      headers: {
        "X-Content-Type-Options": "nosniff",
        "X-XSS-Protection": "1",
      },
      continue: true,
    },
  ],
};
