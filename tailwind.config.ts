import { type Config } from "tailwindcss"

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                muted: "hsl(var(--muted))",
                accent: "hsl(var(--accent))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                card: "hsl(var(--card))",
            },
        },
    },
    plugins: [],
}

export default config
