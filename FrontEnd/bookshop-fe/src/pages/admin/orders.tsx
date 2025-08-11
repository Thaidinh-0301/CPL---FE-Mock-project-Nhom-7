import React, { useState } from 'react';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 1, user: 'Nguyen Van A', total: '$50', status: 'Pending' },
    { id: 2, user: 'Tran Van B', total: '$75', status: 'Completed' },
  ]);
  const [newOrder, setNewOrder] = useState({ user: '', total: '', status: 'Pending' });
  const [editOrder, setEditOrder] = useState(null);
  const [nextId, setNextId] = useState(3);

  const handleAdd = () => {
    setOrders([...orders, { ...newOrder, id: nextId, total: `$${newOrder.total}` }]);
    setNewOrder({ user: '', total: '', status: 'Pending' });
    setNextId(nextId + 1);
  };

  const handleEdit = (order: any) => {
    setEditOrder(order);
    setNewOrder({ user: order.user, total: order.total.replace('$', ''), status: order.status });
  };

  const handleUpdate = () => {
    setOrders(orders.map(o => o.id === editOrder.id ? { ...editOrder, user: newOrder.user, total: `$${newOrder.total}`, status: newOrder.status } : o));
    setEditOrder(null);
    setNewOrder({ user: '', total: '', status: 'Pending' });
  };

  const handleDelete = (id: number) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Orders</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="mb-4">
          <input
            type="text"
            value={newOrder.user}
            onChange={(e) => setNewOrder({ ...newOrder, user: e.target.value })}
            placeholder="User"
            className="border p-2 rounded mr-2"
          />
          <input
            type="number"
            value={newOrder.total}
            onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
            placeholder="Total"
            className="border p-2 rounded mr-2"
          />
          <select
            value={newOrder.status}
            onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
            className="border p-2 rounded mr-2"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={editOrder ? handleUpdate : handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editOrder ? 'Update' : 'Add'}
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">User</th>
              <th className="border p-2 text-left">Total</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">{order.user}</td>
                <td className="border p-2">{order.total}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(order)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;