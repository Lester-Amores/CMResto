import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from '@inertiajs/progress';
import { createRoot } from 'react-dom/client';
import "../css/app.css";

InertiaProgress.init(); // Initialize Inertia progress bar

createInertiaApp({
    resolve: (name) =>
        import(`./pages/${name}.tsx`), // Instead of resolvePageComponent
    setup({ el, App, props }) {
        console.log("Inertia App Props:", props);
        createRoot(el).render(<App {...props} />);
    },
});