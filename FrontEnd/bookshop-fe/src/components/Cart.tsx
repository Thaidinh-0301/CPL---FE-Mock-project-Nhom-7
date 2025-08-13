
// Cart Component - Quản lý giỏ hàng
import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Sửa số lượng sản phẩm
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  // Tính tổng tiền
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg border border-blue-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6h13" /></svg>
          Giỏ hàng
          {cartItems.length > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{cartItems.length}</span>
          )}
        </h2>
        <span className="text-lg font-semibold text-gray-700">Tổng: <span className="text-blue-600">{total.toLocaleString()}₫</span></span>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <img src="https://cdn.tikicdn.com/media/catalog/product/placeholder.png" alt="empty" className="mx-auto mb-4 w-20 h-20 opacity-60" />
          <p>Giỏ hàng của bạn đang trống.</p>
        </div>
      ) : (
        <ul className="divide-y divide-blue-100">
          {cartItems.map(item => (
            <li key={item.id} className="flex items-center py-4">
              <img src={item.image || "https://cdn.tikicdn.com/media/catalog/product/placeholder.png"} alt={item.name} className="w-16 h-16 rounded border mr-4" />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-blue-600 font-bold">{item.price.toLocaleString()}₫</div>
                <div className="flex items-center mt-2">
                  <span className="mr-2 text-sm text-gray-600">Số lượng:</span>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 px-2 py-1 border rounded focus:outline-blue-400"
                  />
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow"
                title="Xóa khỏi giỏ"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Demo nút thêm sản phẩm */}
      <button
        onClick={() => addToCart({ id: 1, name: 'Sách demo', price: 100000, image: 'https://salt.tikicdn.com/cache/280x280/ts/product/2a/2a/2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a.jpg' })}
        className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition"
      >
        <span className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Thêm sách demo
        </span>
      </button>
    </div>
  );
};

export default Cart;
