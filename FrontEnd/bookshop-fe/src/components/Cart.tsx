import React, { useState } from 'react';
import { Book } from '../types/book';

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartProps {
  initialItems?: CartItem[];
}

const Cart: React.FC<CartProps> = ({ initialItems = [] }) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const handleIncrease = (index: number) => {
    setItems(items => items.map((item, i) => i === index ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (index: number) => {
    setItems(items => items.map((item, i) => i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const handleRemove = (index: number) => {
    setItems(items => items.filter((_, i) => i !== index));
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.book.saleOffPrice || item.book.price) * item.quantity, 0);

  return (
    <div className="bg-white rounded shadow p-6 w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">GIỎ HÀNG</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng trống.</p>
      ) : (
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600 text-sm bg-gray-100">
              <th className="p-2">Sản phẩm</th>
              <th className="p-2">Đơn giá</th>
              <th className="p-2">Số lượng</th>
              <th className="p-2">Thành tiền</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.book.id} className="bg-white shadow rounded">
                <td className="flex items-center gap-3 p-2">
                  <img src={item.book.images[0]} alt={item.book.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <div className="font-semibold text-base">{item.book.title}</div>
                    <div className="text-xs text-gray-500">{item.book.author}</div>
                  </div>
                </td>
                <td className="p-2">
                  <span className="text-red-500 font-bold">
                    {(item.book.saleOffPrice || item.book.price).toLocaleString()}₫
                  </span>
                  {item.book.saleOffPrice && (
                    <span className="line-through text-gray-400 ml-2 text-xs">{item.book.price.toLocaleString()}₫</span>
                  )}
                </td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 border rounded text-gray-600" onClick={() => handleDecrease(idx)}>-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button className="px-2 py-1 border rounded text-gray-600" onClick={() => handleIncrease(idx)}>+</button>
                  </div>
                </td>
                <td className="p-2 text-red-500 font-bold">
                  {((item.book.saleOffPrice || item.book.price) * item.quantity).toLocaleString()}₫
                </td>
                <td className="p-2">
                  <button className="text-gray-400 hover:text-red-500" onClick={() => handleRemove(idx)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-end mt-6">
        <span className="text-lg font-bold text-red-500">Tổng tiền: {totalPrice.toLocaleString()}₫</span>
      </div>
    </div>
  );
};

export default Cart;
