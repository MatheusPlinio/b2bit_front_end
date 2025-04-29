// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: number;
        email: string;
        accessToken: string;
        refreshToken: string;
    }

    interface Session {
        accessToken: string;
        refreshToken: string;
    }

    interface JWT {
        accessToken: string;
        refreshToken: string;
    }
}