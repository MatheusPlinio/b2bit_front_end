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
        user: {
            id: number;
            email?: string | null;
            name?: string | null;
            image?: string | null;
        };
        accessToken: string;
        refreshToken: string;
    }

    interface JWT {
        id?: number;
        accessToken: string;
        refreshToken: string;
    }
}