import MainLayout from "../layouts/MainLayout";
import { login } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { router } from '@inertiajs/react';


export default function LogInPage() {
    const [data, setData] = useState({ email: "", password: "" });
    const mutation = useMutation({
        mutationFn: () => login(data.email, data.password),
        onSuccess: () => {
            router.visit('/dashboard'); // ✅ Redirect after login
        },
        onError: (error: any) => {
            console.error("Login failed:", error);
        },
    });
    const errors = (mutation.error as any)?.response?.data?.errors ||
        (mutation.error as any)?.errors || {};

    const errorMessage = mutation?.error?.error;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    };
    
    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="px-10 py-6 bg-white shadow-lg rounded-2xl w-96">
                    <h2 className="text-center mb-6 text-2xl font-bold">Login</h2>
                    {mutation.isError && (
                        <p className="text-red-500 text-sm text-center mb-2">{errorMessage}</p>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold">Email:</label>
                            <input id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" placeholder="example@gmail.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email[0]}</p>}

                        </div>

                        <div className="flex flex-col space-y-2 pb-4">
                            <label htmlFor="password" className="text-sm font-semibold">Password:</label>
                            <input id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password[0]}</p>}

                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" disabled={mutation.isPending}>
                            {mutation.isPending ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
LogInPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
