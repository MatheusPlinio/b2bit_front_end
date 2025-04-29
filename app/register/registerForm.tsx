'use client';

import { registerWithCredentials } from "@/lib/api/auth";
import { useFormSubmit } from "@/lib/formSubmit";
import { Tregister } from "@/types/Login";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Tregister>();

    const submit = useFormSubmit<Tregister>();

    const onSubmit = (data: Tregister) => {
        submit(data, {
            request: (data) => registerWithCredentials(data),
            onSuccessRedirect: '/login'
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Create Account
                </h2>

                <div className="mb-4">
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            Email é obrigatório
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        {...register('username', { required: true })}
                        placeholder="Username"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            Necessário um nome de usuário
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            Senha é obrigatória
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    )
}