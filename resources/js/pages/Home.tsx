
export default function Home({ name }: { name: string }) {
    return (
        <>
            <h1>Welcome, {name}!</h1>
            <p>This is the home page.</p>
        </>
    );
}