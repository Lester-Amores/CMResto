import { ReactNode } from "react";
import { ElementType } from "react";


export interface SharedProps extends Record<string, any> {
    auth: {
        user: {
            id: number;
            email: string;
            name: string;
        } | null;
    };
    currentRoute: string | null;
    errors: Partial<Record<"email" | "password", string>> & {
        error?: string;
    };
}

export interface SidebarItem {
    title: string;
    icon: ElementType;
    path: string;
    children?: SidebarItem[];
}

export interface LayoutProps {
    title?: string;
    children: ReactNode;
}