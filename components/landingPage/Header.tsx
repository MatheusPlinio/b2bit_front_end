import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="w-full px-6 py-4 flex justify-between items-center border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">

            <Link href="/" className="text-xl font-bold text-primary">
                KANBRAIN
            </Link>

            <nav className="hidden md:flex gap-6 items-center text-sm text-muted-foreground">
                <Link href="#how-it-works" className="hover:text-primary transition">
                    Como funciona
                </Link>
                <Link href="#pricing" className="hover:text-primary transition">
                    Preços
                </Link>
                <Link href="#solutions" className="hover:text-primary transition">
                    Soluções
                </Link>
            </nav>

            <div className="flex gap-4 items-center">
                <Link href="/sign-in">
                    <Button variant="ghost" className="text-sm">
                        Entrar
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="text-sm">
                        Começar grátis
                    </Button>
                </Link>
            </div>
        </header>
    )
}
