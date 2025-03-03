import { createInertiaApp } from "@inertiajs/react";
import { InertiaProgress } from "@inertiajs/progress";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../css/app.css";

const queryClient = new QueryClient();
type PageComponent = React.ComponentType<any> & { layout?: (page: React.ReactNode) => React.ReactNode };

InertiaProgress.init(); // Initialize Inertia progress bar

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx", { eager: false }) as Record<
            string,
            () => Promise<{ default: PageComponent }>
        >;

        const importPage = pages[`./pages/${name}.tsx`];
        if (!importPage) {
            throw new Error(`Page not found: ${name}`);
        }

        const module = await importPage();
        const page = module.default;

        page.layout = page.layout || ((page: React.ReactNode) => page);
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
