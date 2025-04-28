export async function login(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
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

export async function register(data: {
    name: string;
    email: string;
    password: string;
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
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
        throw new Error(err.message || "Erro no registro");
    }

    return res.json();
}