import { ReactNode } from "react";
import { Head, Link } from "@inertiajs/react";

interface LayoutProps {
    title?: string;
    children: ReactNode;
}

export default function MainLayout({ title, children }: LayoutProps) {
    return (
        <>
            <Head title={title || "Admin Panel"} />

            <header className="bg-blue-600 text-white p-4">
                <nav className="container mx-auto flex justify-between">
                    <h1 className="text-lg font-bold"><Link href= "/" >CLassic Meal</Link></h1>
                </nav>
            </header>

            <main className="container mx-auto p-4">{children}</main>


            <footer className="bg-gray-800 text-white text-center p-4 mt-8">
                &copy; {new Date().getFullYear()} My Admin Panel
            </footer>
        </>
    )
}