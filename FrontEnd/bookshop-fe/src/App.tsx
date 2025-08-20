import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import Orders from './pages/admin/orders.tsx';
import Login from './pages/admin/Login.tsx';
import BookSearch from './pages/BookSearch';
import Cart from './components/Cart';
import LoginDemo from './components/Login'; // UI demo
import RegisterDemo from './components/Register'; // UI demo
import OrderHistoryV2 from './components/OrderHistoryV2'; // Lịch sử đơn hàng giao diện Tiki

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/books" element={<BookSearch />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-history" element={<OrderHistoryV2 />} />
    {/* Demo UI Login/Register */}
        <Route path="/login-demo" element={<LoginDemo />} />
        <Route path="/register-demo" element={<RegisterDemo />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;