// src/admin/pages/AdminUsers.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm('Delete user?')) return;
    await api.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Users</h1>
      <div className="bg-white rounded shadow">
        <table className="min-w-full">
          <thead><tr><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><button onClick={() => deleteUser(u._id)} className="text-red-500">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
