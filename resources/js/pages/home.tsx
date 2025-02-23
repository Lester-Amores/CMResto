import MainLayout from "../layouts/MainLayout";

export default function Home({ name }: { name: string }) {
    return (
        <MainLayout title="Home">
            <h1>Welcome, {name}!</h1>
            <p>This is the home page.</p>
        </MainLayout>
    );
}
