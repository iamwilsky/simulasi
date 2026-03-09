import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
