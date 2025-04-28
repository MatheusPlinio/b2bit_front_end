declare namespace NodeJS {
    interface ProcessEnv {
        KANBRAIN_API_URL: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
        NEXTAUTH_SECRET: string;
        NEXT_PUBLIC_API_URL: string;
    }
}