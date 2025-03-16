import { ReactNode } from "react";
import { Head, usePage } from "@inertiajs/react";
import { SharedProps } from "../types/types";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LayoutProps } from "../types/types";

export default function MainLayout({ children }: LayoutProps) {
    const { auth, currentRoute } = usePage<SharedProps>().props;
    const isAuthenticated = !!auth.user;
    const isAuthPage = currentRoute?.startsWith("auth.");
    const pageTitle = currentRoute === "dashboard" ? "Dashboard" : "Admin Panel";

    return (
        <>
            <Head title={pageTitle} />

            {isAuthPage && !isAuthenticated && <Header />}

            <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
                {isAuthPage && isAuthenticated && (
                    <div className="w-64 md:block hidden">
                        <Sidebar />
                    </div>
                )}

                <main className="flex-1 p-6 min-h-screen overflow-auto">
                    {children}
                </main>
            </div>

            {isAuthPage && !isAuthenticated && <Footer />}
        </>
    );
}
