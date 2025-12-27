import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const data = await res.json();

        if (res.ok && data.code === 200) {
          return {
            id: data.result.user.id,
            username: data.result.user.username,
            accessToken: data.result.accessToken,
            refreshToken: data.result.refreshToken,
          };
        }

        return null; // login sai
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // chạy khi login
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
        };
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions as NextAuthOptions);

export { handler as GET, handler as POST };
