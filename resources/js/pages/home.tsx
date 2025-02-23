import { Head } from '@inertiajs/react';

export default function Home({ name }: { name: string }) {
    console.log("🏠 Home component mounted with props:", name);
    
    if (!name) {
        console.warn("⚠️ No name prop received in Home component!");
    }

    return (
        <>
            <Head title="Home" />
            <h1>Welcome, {name || "Guest"}!</h1>
        </>
    );
}
