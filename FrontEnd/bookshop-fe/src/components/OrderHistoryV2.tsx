import React, { useState } from 'react';

export type OrderStatus =
  | 'Tiki đã tiếp nhận đơn hàng'
  | 'Đã xác nhận'
  | 'Đang giao hàng'
  | 'Đã giao hàng'
  | 'Đã hủy';

interface OrderProduct {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;
  payment: string;
  shipping: string;
  receiver: {
    name: string;
    address: string;
    phone: string;
  };
}

const mockOrders: Order[] = [
  {
    id: '547927238',
    date: '21/02/2019',
    products: [
      {
        id: 'tvbox',
        title: 'Android Tivi Box Xiaomi Mibox 4K Global Quốc Tế (MDZ-16-AB) - Hàng Chính Hãng',
        quantity: 1,
        price: 1790000,
        image: 'https://salt.tikicdn.com/cache/280x280/ts/product/7a/7b/7e/7a7b7e7e7e7e7e7e7e7e.jpg',
      },
    ],
    total: 1790000,
    status: 'Tiki đã tiếp nhận đơn hàng',
    payment: 'Thanh toán tiền mặt khi nhận hàng',
    shipping: 'Giao hàng tiêu chuẩn',
    receiver: {
      name: 'Trần Thị',
      address: '5F Phường Hiệp Thành, Thành phố Thủ Dầu Một, Bình Dương',
      phone: '0123456789',
    },
  },
];

const OrderDetail: React.FC<{ order: Order; onCancel?: (id: string) => void }> = ({ order, onCancel }) => (
  <div className="bg-white rounded shadow p-6 mb-8">
    <div className="mb-4 text-lg font-bold">
      Chi tiết đơn hàng #{order.id} - <span className="text-yellow-600">{order.status}</span>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <div className="font-semibold">Địa chỉ người nhận</div>
        <div>{order.receiver.name}</div>
        <div>{order.receiver.address}</div>
        <div>{order.receiver.phone}</div>
      </div>
      <div>
        <div className="font-semibold">Hình thức giao hàng</div>
        <div>{order.shipping}</div>
        <div className="text-xs text-gray-500">Miễn phí vận chuyển</div>
      </div>
      <div>
        <div className="font-semibold">Hình thức thanh toán</div>
        <div>{order.payment}</div>
      </div>
    </div>
    <table className="w-full text-left mb-4">
      <thead>
        <tr className="bg-gray-100 text-gray-600 text-sm">
          <th className="p-2">Sản phẩm</th>
          <th className="p-2">Giá</th>
          <th className="p-2">Số lượng</th>
          <th className="p-2">Tạm tính</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map(p => (
          <tr key={p.id}>
            <td className="p-2 flex items-center gap-2">
              {p.image && <img src={p.image} alt={p.title} className="w-12 h-12 object-cover rounded" />}
              <span>{p.title}</span>
            </td>
            <td className="p-2">{p.price.toLocaleString()}₫</td>
            <td className="p-2">{p.quantity}</td>
            <td className="p-2">{(p.price * p.quantity).toLocaleString()}₫</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-end gap-8 mb-2">
      <div>Tổng tạm tính: <span className="font-bold">{order.total.toLocaleString()}₫</span></div>
      <div>Phí vận chuyển: <span className="font-bold">0₫</span></div>
      <div>Tổng cộng: <span className="font-bold text-red-500">{order.total.toLocaleString()}₫</span></div>
    </div>
    {order.status === 'Đã xác nhận' && (
      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => onCancel && onCancel(order.id)}
        >
          Hủy đơn hàng
        </button>
      </div>
    )}
  </div>
);

const OrderHistoryV2: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0]?.id || null);

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

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  return (
    <div className="bg-white rounded shadow p-6 w-full max-w-5xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6">Đơn hàng của tôi</h2>
      <div className="mb-6">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-2">Mã đơn hàng</th>
              <th className="p-2">Ngày mua</th>
              <th className="p-2">Tổng tiền</th>
              <th className="p-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order.id}
                className={`bg-white shadow rounded cursor-pointer ${selectedOrderId === order.id ? 'ring-2 ring-blue-400' : ''}`}
                onClick={() => setSelectedOrderId(order.id)}
              >
                <td className="p-2 text-blue-600 font-semibold underline">{order.id}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2 font-bold text-red-500">{order.total.toLocaleString()}₫</td>
                <td className="p-2">
                  <span className={
                    order.status === 'Tiki đã tiếp nhận đơn hàng' ? 'text-yellow-500' :
                    order.status === 'Đã xác nhận' ? 'text-yellow-500' :
                    order.status === 'Đang giao hàng' ? 'text-blue-500' :
                    order.status === 'Đã giao hàng' ? 'text-green-600' :
                    'text-gray-400'
                  }>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetail order={selectedOrder} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default OrderHistoryV2;
