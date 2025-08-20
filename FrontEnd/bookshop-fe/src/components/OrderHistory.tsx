import React, { useState } from 'react';

export type OrderStatus = 'Đã xác nhận' | 'Đang giao hàng' | 'Đã giao hàng' | 'Đã hủy';

interface OrderProduct {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;
  payment: string;
  shipping: string;
}

const mockOrders: Order[] = [
  {
    id: '38442142',
    date: '12/12/2019',
    products: [
      { id: '1', title: 'Bình Giữ Nhiệt Lock&Lock Vienna LHC1430SV (500ml) - Bạc', quantity: 1, price: 179000 },
    ],
    total: 179000,
    status: 'Đã giao hàng',
    payment: 'Ví điện tử',
    shipping: 'Giao hàng tiêu chuẩn',
  },
  {
    id: '38442143',
    date: '15/08/2025',
    products: [
      { id: '2', title: 'Sách Lập trình React', quantity: 2, price: 120000 },
      { id: '3', title: 'Sách NodeJS', quantity: 1, price: 95000 },
    ],
    total: 335000,
    status: 'Đã xác nhận',
    payment: 'Thanh toán khi nhận hàng',
    shipping: 'Giao hàng nhanh',
  },
];

const paymentMethods = ['Ví điện tử', 'Thanh toán khi nhận hàng', 'Thẻ ngân hàng'];
const shippingMethods = ['Giao hàng tiêu chuẩn', 'Giao hàng nhanh', 'Nhận tại cửa hàng'];

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleCancel = (orderId: string) => {
    setOrders(orders =>
      orders.map(order =>
        order.id === orderId && order.status === 'Đã xác nhận'
          ? { ...order, status: 'Đã hủy' }
          : order
      )
    );
    alert('Đơn hàng đã được hủy thành công!');
  };

  return (
    <div className="bg-white rounded shadow p-6 w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6">Đơn hàng của tôi</h2>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="p-2">Mã đơn hàng</th>
            <th className="p-2">Ngày mua</th>
            <th className="p-2">Sản phẩm</th>
            <th className="p-2">Tổng tiền</th>
            <th className="p-2">Thanh toán</th>
            <th className="p-2">Giao hàng</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="bg-white shadow rounded">
              <td className="p-2 text-blue-600 font-semibold">{order.id}</td>
              <td className="p-2">{order.date}</td>
              <td className="p-2">
                {order.products.map(p => (
                  <div key={p.id} className="mb-1">
                    {p.title} <span className="text-xs text-gray-500">x{p.quantity}</span>
                  </div>
                ))}
              </td>
              <td className="p-2 font-bold text-red-500">{order.total.toLocaleString()}₫</td>
              <td className="p-2">
                <select className="border rounded px-2 py-1 text-sm" value={order.payment} disabled>
                  {paymentMethods.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <select className="border rounded px-2 py-1 text-sm" value={order.shipping} disabled>
                  {shippingMethods.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <span className={
                  order.status === 'Đã xác nhận' ? 'text-yellow-500' :
                  order.status === 'Đang giao hàng' ? 'text-blue-500' :
                  order.status === 'Đã giao hàng' ? 'text-green-600' :
                  'text-gray-400'
                }>
                  {order.status}
                </span>
              </td>
              <td className="p-2">
                {order.status === 'Đã xác nhận' && (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    onClick={() => handleCancel(order.id)}
                  >
                    Hủy đơn
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
