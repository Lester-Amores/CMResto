import { SidebarItem } from "../types/types";
import { Squares2X2Icon, UserIcon } from "@heroicons/react/20/solid";
export const sidebarItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: Squares2X2Icon,
    },
    {
        title: "Staff",
        path: "/staff",
        icon: UserIcon,
    }
] as SidebarItem[];
