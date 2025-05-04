import { getServerSession } from "next-auth";
import FormLogin from "./formLogin";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {

    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/feed');
    }

    return (
        <div>
            <FormLogin />
            <Link href="/register">Register</Link>
        </div>
    );
}
