import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: string;
      username: string;
    };
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: string;
      username: string;
    };
  }
}
