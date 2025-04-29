'use client';

import { loginWithCredentials } from "@/lib/api/auth";
import { useFormSubmit } from "@/lib/formSubmit";
import { Tlogin } from "@/types/Login";
import { useForm } from "react-hook-form";

export default function FormLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Tlogin>();
    const submit = useFormSubmit<Tlogin>();

    const onSubmit = (data: Tlogin) => {
        submit(data, {
            request: (data) => loginWithCredentials(data.email, data.password),
            onSuccessRedirect: '/dashboard',
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <div className="mb-4">
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            Email é obrigatório
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                            Senha é obrigatória
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    )
}