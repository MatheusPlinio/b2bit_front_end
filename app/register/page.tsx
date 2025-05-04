import Link from "next/link";
import RegisterForm from "./registerForm";

export default async function RegisterPage() {
    return (
        <div>
            <RegisterForm />
            <Link href="/login">Login</Link>
        </div>
    )
}
