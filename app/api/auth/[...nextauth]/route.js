import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../../database/connection";
import User from "../../../../database/schema/User";
import bcrypt from "bcrypt";

connect();

export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await signInWIthCredentials(email, password);

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/user/sign-in",
    error: "/user/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.type === "oauth" && profile?.email) {
        return await signInWithOAuth(account, profile);
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      const user = await getUserByEmail(token.email);
      token.user = user;
      token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };

const signInWithOAuth = async (account, profile) => {
  const user = await User.findOne({ email: profile.email });
  if (user) return true;

  const newUser = new User({
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
    role: "user",
    cart: {
      items: [],
      total: 0,
      mrp: 0,
    },
  });
  await newUser.save();

  return true;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("-password");
  if (!user) throw new Error("Email does not exist");

  return { ...user._doc, id: user._id.toString() };
};

const signInWIthCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email does not exist");

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error("Password is incorrect");

  return { ...user._doc, id: user._id.toString() };
};
