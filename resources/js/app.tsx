import { createInertiaApp } from "@inertiajs/react";
import { InertiaProgress } from "@inertiajs/progress";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../css/app.css";
import MainLayout from "./layouts/MainLayout";
const queryClient = new QueryClient();

InertiaProgress.init();

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx", { eager: false }) as Record<
            string,
            () => Promise<{ default: React.ComponentType<any> & { layout?: (page: React.ReactNode) => React.ReactNode } }>
        >;

        const importPage = pages[`./pages/${name}.tsx`];
        
        const module = await importPage();
        const page = module.default;

        page.layout = page.layout || ((page: React.ReactNode) => <MainLayout>{page}</MainLayout>);

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
            </QueryClientProvider>
        );
    },
});
