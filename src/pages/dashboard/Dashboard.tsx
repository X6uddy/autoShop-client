import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Spinner from "../../components/spinner/Spinner";
import Header from "../../components/header/Header";

const Dashboard = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<Spinner />}>
                <Outlet />
            </Suspense>
        </>
    )
}
export default Dashboard;