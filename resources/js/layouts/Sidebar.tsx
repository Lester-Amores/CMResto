import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { sidebarItems } from "../constants/sidebar";
import LogoutButton from "../components/LogoutButton";
import { SidebarItem } from "../types/types";

const Sidebar = () => {
    const { url } = usePage();
    const currentPath = url;
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleMenu = (item: SidebarItem) => {
        const title = item?.title;

        setOpenMenus((prev) =>
            prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
        );
    };

    return (
        <aside className="w-64 h-full bg-white text-gray-800 shadow-md fixed top-0 left-0 pt-5 flex flex-col border-r border-gray-300 text-sm">
            <h1 className="text-xl font-bold mb-8 px-4">
                <Link href="/" className="text-gray-900 hover:text-blue-600">Classic Meal</Link>
            </h1>
            <nav>
                <ul className="space-y-2">
                    {sidebarItems.map((item) => {
                        const IconComponent = item.icon;
                        const isParentActive = currentPath === item.path;

                        return (
                            <li key={item.title}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleMenu(item)}
                                            className="w-full text-left p-2 rounded flex items-center gap-2 hover:bg-gray-100 transition"
                                        >
                                            <IconComponent className="w-5 h-5 text-gray-700" />
                                            {item.title}
                                            <span>{openMenus.includes(item.title) ? "▲" : "▼"}</span>
                                        </button>
                                        {openMenus.includes(item.title) && (
                                            <ul className="ml-4 space-y-1">
                                                {item.children.map((child) => {
                                                    const isChildActive = currentPath === child.path;

                                                    return (
                                                        <li key={child.title}>
                                                            <Link
                                                                href={child.path}
                                                                className={`flex items-center p-2 rounded ${isChildActive ? "bg-gray-300" : "hover:bg-gray-100"
                                                                    } transition`}
                                                            >
                                                                <IconComponent className="w-5 h-5 text-gray-900" />
                                                                {child.title}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.path}
                                        className={`p-2 flex items-center gap-2 rounded ${isParentActive ? "bg-gray-300" : "hover:bg-gray-100"
                                            } transition`}
                                    >
                                        <IconComponent className="w-5 h-5 text-gray-700" />
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="mt-auto p-4">
                <LogoutButton />
            </div>
        </aside>
    );
};

export default Sidebar;
