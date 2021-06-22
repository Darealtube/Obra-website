import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

// This is the endpoint in which ALL the session handling is found.
// The Providers are the list of ways on how the users could log in,
// and we could add more. The Database is set to our MONGODB URI link,
// and other options. Know more: https://next-auth.js.org/configuration/options

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID_2,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_2,
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.MONGODB_URI,
  secret: process.env.AUTH_CLIENT_SECRET,
  callbacks: {
    session: async (session, user) => {
      session.id = user.id as string;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/configure",
  },
});
