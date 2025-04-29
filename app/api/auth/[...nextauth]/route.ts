import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login, loginSocial } from "@/lib/api/auth";
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await login(credentials!.email, credentials!.password);
            
                    if (response && response.access) {
                        return {
                            id: response.user?.id, // ajuste conforme sua API retorna o usuário
                            email: credentials!.email,
                            accessToken: response.access,
                            refreshToken: response.refresh,
                        };
                    }
            
                    throw new Error("Token de acesso não encontrado.");
                } catch (err) {
                    console.error("Erro ao autenticar com email/senha:", err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            const isOAuthLogin = account && (account.provider === 'google' || account.provider === 'github');

            if (isOAuthLogin && profile?.email) {
                const payload = {
                    name: profile.name,
                    email: profile.email,
                    sub: user.id,
                    provider: account.provider,
                };

                try {
                    const customJwt = jwt.sign(payload, process.env.NEXTAUTH_SECRET, {
                        issuer: 'next-auth',
                    });

                    const response = await loginSocial(customJwt);

                    if (response?.accessToken) {
                        token.accessToken = response.accessToken;
                    }
                } catch (error) {
                    console.error("Erro ao autenticar com API social:", error);
                }
            }

            if (user && user.accessToken) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };