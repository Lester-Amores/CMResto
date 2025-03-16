import { Link } from "@inertiajs/react";

export default function LogoutButton() {
    return (
        <Link
            href="/logout"
            method="post"
            as="button"
            className="w-full flex items-center gap-2 p-2 bg-gray-300 hover:bg-gray-500"
        >
            <img src="" alt="Logout" className="w-5 h-5" />
            Logout
        </Link>
    );
}
