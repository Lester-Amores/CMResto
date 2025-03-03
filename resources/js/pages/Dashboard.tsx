import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <p>Admin statistics go here.</p>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
