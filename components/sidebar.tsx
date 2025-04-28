"use client";
import {
    LayoutDashboard,
    Settings,
    LogOut,
    Menu,
    ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

export default function Sidebar() {
    const { data: session } = useSession();
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);

    if (!session) return null;

    const user = session.user;

    const navItems: NavItem[] = [
        { label: "Board", href: "/dashboard", icon: LayoutDashboard },
        { label: "Configurações", href: "/dashboard/settings", icon: Settings },
    ];

    const renderNavItem = (item: NavItem) => (
        <Link href={item.href} key={item.href}>
            <Button
                variant="ghost"
                className={clsx(
                    "w-full justify-start gap-2 transition-all",
                    collapsed && "justify-center"
                )}
            >
                <item.icon size={18} />
                {!collapsed && item.label}
            </Button>
        </Link>
    );

    return (
        <>
            <div className="md:hidden p-2">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-4 flex flex-col">
                        <div className="text-xl font-bold mb-6">Kanban IA</div>
                        <nav className="flex flex-col gap-1 mb-6">
                            {navItems.map(renderNavItem)}
                        </nav>
                        <Separator />
                        <div className="mt-auto flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={user?.image || ""} />
                                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                                <p>{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="mt-4 justify-start gap-2 text-red-500"
                            onClick={() => signOut()}
                        >
                            <LogOut size={18} />
                            Sair
                        </Button>
                    </SheetContent>
                </Sheet>
            </div>

            <aside
                className={clsx(
                    "hidden md:flex flex-col h-screen bg-muted border-r p-4 transition-all duration-200",
                    collapsed ? "w-16 items-center text-center" : "w-64"
                )}
            >
                <div className="flex items-center justify-between mb-6">
                    {!collapsed && <h2 className="text-xl font-bold">Kanban IA</h2>}
                    <Button
                        className="cursor-pointer"
                        size="icon"
                        variant="ghost"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <Menu /> : <ChevronLeft />}
                    </Button>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    {navItems.map(renderNavItem)}
                </nav>

                <Separator className="my-4" />

                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="text-sm">
                            <p>{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                    )}
                </div>
                <Button
                    variant="ghost"
                    className={clsx("mt-2 justify-start gap-2 text-red-500", collapsed && "justify-center")}
                    onClick={() => signOut()}
                >
                    <LogOut size={18} />
                    {!collapsed && "Sair"}
                </Button>
            </aside>
        </>
    );
}
