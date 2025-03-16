import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { sidebarItems } from "../constants/sidebar";
import LogoutButton from "./LogoutButton";


interface SidebarItem  {
    title: string;
    icon: undefined;
    path?: string;
    children?: {
        title?: string;
        path?: string;
        icon?: undefined;
    }[];
};



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
        <aside className="w-64 h-full bg-gray-100 text-black fixed top-0 left-0 pt-5 flex flex-col">
            <h1 className="text-lg font-bold mb-5"><Link href="/">Classic Meal</Link></h1>
            <nav>
                <ul className="space-y-2">
                    {sidebarItems.map((item) => {
                        return (
                            <li key={item.title}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleMenu(item)}
                                            className={`w-full text-left p-2 rounded flex items-center gap-2 `}
                                        >
                                            <img src={item.icon} alt={item.title} className="w-5 h-5" />
                                            {item.title}
                                            <span>{openMenus.includes(item.title) ? "▲" : "▼"}</span>
                                        </button>
                                        {openMenus.includes(item.title) && (
                                            <ul className="ml-4 space-y-1">
                                                {item?.children?.map((child) => {
                                                    const isChildActive = currentPath === child.path;

                                                    return (
                                                        <li key={child.title}>
                                                            <Link
                                                                href={child.path}
                                                                className={`flex items-center p-2 ${isChildActive ? "bg-gray-400 " : "hover:bg-gray-300"
                                                                    }`}
                                                            >
                                                                <img src={child.icon} alt={child.title} className="w-5 h-5 mr-1" />
                                                                {child.title}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    (() => {
                                        const isParentActive = currentPath === item.path;
                                        return (
                                            <Link
                                                href={item.path}
                                                className={`p-2 flex items-center gap-2 ${isParentActive ? "bg-gray-400 " : "hover:bg-gray-700"
                                                    }`}
                                            >
                                                <img src={item.icon} alt={item.title} className="w-5 h-5" />
                                                {item.title}
                                            </Link>
                                        );
                                    })()
                                )}

                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="mt-auto">
                <LogoutButton />
            </div>
        </aside>
    );
};

export default Sidebar;
