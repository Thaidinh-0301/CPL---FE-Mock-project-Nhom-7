import React from 'react';
import Orders from './orders';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
                    <p className="text-2xl text-blue-600">150</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                    <p className="text-2xl text-blue-600">200</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                    <p className="text-2xl text-blue-600">300</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
                    <p className="text-2xl text-blue-600">$5,000</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Recent Activities</h3>
                    <p className="text-2xl text-blue-600">No recent activities yet.</p>
            </div>
        </div>
    );
};

export default Dashboard;