import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-blue-700 text-white p-4 shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin TiKi</h1>
                <button
                    className="bg-gray-100 text-blue-700 px-4 py-2 rounded hover:bg-gray-200"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;