import React, { useState } from 'react';

const Users: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyen Van A', email: 'a.nguyen@tiki.vn', role: 'User' },
    { id: 2, name: 'Tran Van B', email: 'b.tran@tiki.vn', role: 'Admin' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [editUser, setEditUser] = useState(null);
  const [nextId, setNextId] = useState(3);

  const handleAdd = () => {
    setUsers([...users, { ...newUser, id: nextId }]);
    setNewUser({ name: '', email: '', role: 'User' });
    setNextId(nextId + 1);
  };

  const handleEdit = (user: any) => {
    setEditUser(user);
    setNewUser({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdate = () => {
    setUsers(users.map(u => u.id === editUser.id ? { ...editUser, name: newUser.name, email: newUser.email, role: newUser.role } : u));
    setEditUser(null);
    setNewUser({ name: '', email: '', role: 'User' });
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="mb-4">
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Name"
            className="border p-2 rounded mr-2"
          />
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            className="border p-2 rounded mr-2"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded mr-2"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            onClick={editUser ? handleUpdate : handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editUser ? 'Update' : 'Add'}
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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

export default Users;