'use client';

import Link from "next/link"
import { useSession } from "next-auth/react"
import { User } from "lucide-react"

export default function Header() {
    const { data: session } = useSession()
    const user = session?.user

    return (
        <header className="bg-[#f4f5f7] text-gray-800 border-b border-[#e0e0e0] py-4 px-6 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-xl font-bold hover:opacity-80 transition">
                    MyXClone
                </Link>

                {user && (
                    <nav className="flex gap-6 items-center text-sm font-medium">
                        <Link
                            href="#"
                            className="hover:underline flex items-center gap-1"
                        >
                            <User size={16} />
                            Perfil
                        </Link>

                        <Link
                            href="#"
                            className="hover:underline"
                        >
                            Seguidores
                        </Link>

                        <Link
                            href="#"
                            className="hover:underline"
                        >
                            Seguindo
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}
