import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
