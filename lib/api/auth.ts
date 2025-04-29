import { signIn } from "next-auth/react";

export async function login(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Credenciais Inválidas");
    }

    return res.json();
}

export async function loginSocial(tokenJwt: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login-social`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ token: tokenJwt }),
        cache: "no-store",
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao autenticar com Laravel");
    }

    return res.json();
}

export async function loginWithCredentials(email: string, password: string) {
    const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
    });

    if (res?.error) {
        throw new Error(res.error);
    }

    return { message: "Login realizado com sucesso" };
}

export async function registerWithCredentials(data: {
    username: string;
    email: string;
    password: string;
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data),
        cache: "no-store"
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(JSON.stringify(err));
    }

    return res.json();
}