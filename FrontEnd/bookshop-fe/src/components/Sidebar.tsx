import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-white text-blue-600 h-full p-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/Logo_Tiki_2023.png" alt="TiKi Logo"
            className="h-20 w-auto" />
            <ul>
                <li className="mb-2">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => 
                            `block font-semibold text-lg tracking-wide font-sans p-2 rounded ${isActive ? 'bg-gray-100' : 'hover:bg-gray-200'}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li className="mb-2">
                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) => 
                            `block font-semibold text-lg tracking-wide font-sans p-2 rounded ${isActive ? 'bg-gray-100' : 'hover:bg-gray-200'}`
                        }
                    >
                        Products
                    </NavLink>
                </li>
                <li className="mb-2">
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) => 
                            `block font-semibold text-lg tracking-wide font-sans p-2 rounded ${isActive ? 'bg-gray-100' : 'hover:bg-gray-200'}`
                        }
                    >
                        Users
                    </NavLink>
                </li>
                <li className="mb-2">
                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) => 
                            `block font-semibold text-lg tracking-wide font-sans p-2 rounded ${isActive ? 'bg-gray-100' : 'hover:bg-gray-200'}`
                        }
                    >
                        Orders
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;