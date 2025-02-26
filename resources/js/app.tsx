import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from '@inertiajs/progress';
import { createRoot } from 'react-dom/client';
import "../css/app.css";

InertiaProgress.init(); // Initialize Inertia progress bar

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx"); // 🔥 Import all pages dynamically
        return pages[`./pages/${name}.tsx`](); // ✅ Ensure page components are found
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
