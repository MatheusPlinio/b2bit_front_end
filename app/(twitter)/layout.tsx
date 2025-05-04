import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function ReelsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/");
    }

    return (
        <div className="flex">
            <main className="flex-1 overflow-auto">
                <Header />
                {children}
            </main>
        </div>
    );
}