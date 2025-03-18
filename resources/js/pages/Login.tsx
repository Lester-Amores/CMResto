import { useForm } from "@inertiajs/react";


const defaultLoginForm = {
    email: "",
    password: "",
    error: "",
};

export default function LogInPage() {
    const { data, setData, post, processing, errors } = useForm(defaultLoginForm);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/login");
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="px-10 py-6 rounded-2xl w-96">
                <h2 className="text-center mb-6 text-2xl font-bold">Login</h2>
                {errors.error && <p className="text-red-500 text-xs text-center mb-2">{errors.error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="example@gmail.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col space-y-2 pb-4">
                        <label htmlFor="password" className="text-sm font-semibold">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter Password"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        disabled={processing}
                    >
                        {processing ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}