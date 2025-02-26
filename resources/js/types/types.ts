export interface SharedProps extends Record<string, any> {
    auth: {
        user: {
            id: number;
            email: string;
        } | null;
    };
    currentRoute: string | null;
}