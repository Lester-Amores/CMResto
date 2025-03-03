import { ReactNode } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { SharedProps } from "../types/types";

interface LayoutProps {
    title?: string;
    children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
    const { auth, currentRoute } = usePage<SharedProps>().props;
    const isAuthenticated = !!auth.user;
    const isAuthPage = currentRoute?.startsWith("auth.");
    const pageTitle = currentRoute === "dashboard" ? "Dashboard" : "Admin Panel";

    return (
        <>
            <Head title={pageTitle} />

            <header className="bg-blue-600 text-white h-16">
                <nav className="container mx-auto flex justify-between items-center h-full">
                    <h1 className="text-lg font-bold"><Link href="/" >CLassic Meal</Link></h1>
                    <div className="h-full flex items-center">
                        {isAuthPage && (<Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="h-full flex items-center py-2 px-4 text-lg bg-blue-500 hover:bg-blue-800"
                        >
                            Logout
                        </Link>
                        )}
                    </div>
                </nav>
            </header>

            <main className="container mx-auto p-4 min-h-screen">
                {isAuthPage && !isAuthenticated ? (
                    <div className="text-center text-red-500 font-semibold text-lg">
                        You must be logged in to access this page. <br />
                        <Link href="/login" className="text-blue-500 underline">
                            Go to Login
                        </Link>
                    </div>
                ) : (
                    children
                )}
            </main>


            <footer className="bg-gray-800 text-white text-center p-4 mt-8">
                &copy; {new Date().getFullYear()} My Admin Panel
            </footer>
        </>
    )
}