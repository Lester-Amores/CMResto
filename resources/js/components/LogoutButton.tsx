import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { UserCircleIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { SharedProps } from "../types/types";

export default function LogoutButton() {
    const { props } = usePage<SharedProps>();
    const user = props?.auth?.user;
    console.log(user);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {isOpen && (
                <div className="absolute bottom-full left-0 mb-1 w-full bg-white shadow-md rounded-md border border-gray-200">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-2 p-2 text-red-600 hover:bg-gray-100 rounded-md"
                    >
                        Logout
                    </Link>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
                <UserCircleIcon className="w-6 h-6 text-gray-600" />
                <span className="text-gray-900 font-medium">{user?.name || "User"}</span>
                {isOpen ? (
                    <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                ) : (
                    <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                )}
            </button>
        </div>
    );
}
