// src/admin/pages/AdminProducts.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';




const AdminProducts = () => {
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
const [editingId, setEditingId] = useState(null); // null = creating, not editing


  
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/admin/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingId) {
      // Update existing product
      const res = await api.put(`/admin/products/${editingId}`, form);
      setProducts(products.map(p => (p._id === editingId ? res.data : p)));
      setEditingId(null);
    } else {
      // Create new product
      const res = await api.post('/admin/products', form);
      setProducts([res.data, ...products]);
    }
    setForm({ name: '', price: '', image: '', description: '', category: '', countInStock: '' });
  } catch (err) {
    console.error(err);
  }
};
const startEdit = (product) => {
  setForm({
    name: product.name,
    price: product.price,
    image: product.image,
    description: product.description || '',
    category: product.category || '',
    countInStock: product.countInStock || ''
  });
  setEditingId(product._id);
};






  const handleDelete = async (id) => {
    if (!window.confirm('Delete product?')) return;
    await api.delete(`/admin/products/${id}`);
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
  <h2 className="text-xl mb-2">{editingId ? 'Edit Product' : 'Add Product'}</h2>
  <form onSubmit={handleSubmit} className="flex flex-col gap-2">
    <input 
      name="name" 
      placeholder="Product Name" 
      value={form.name} 
      onChange={handleChange} 
      required 
      className="border p-2 rounded"
    />
    <input 
      name="price" 
      type="number" 
      placeholder="Price" 
      value={form.price} 
      onChange={handleChange} 
      required 
      className="border p-2 rounded"
    />
    <input 
      name="image" 
      placeholder="Image URL" 
      value={form.image} 
      onChange={handleChange} 
      required 
      className="border p-2 rounded"
    />
    <textarea 
      name="description" 
      placeholder="Description (optional)" 
      value={form.description} 
      onChange={handleChange} 
      className="border p-2 rounded"
    />
    <input 
      name="category" 
      placeholder="Category" 
      value={form.category} 
      onChange={handleChange} 
      required 
      className="border p-2 rounded"
    />
    <input 
      name="countInStock" 
      type="number" 
      placeholder="Count In Stock" 
      value={form.countInStock} 
      onChange={handleChange} 
      required 
      className="border p-2 rounded"
    />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      {editingId ? 'Update Product' : 'Add Product'}
    </button>
    {editingId && (
      <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', price: '', image: '', description: '' }) }} className="text-red-500 mt-2">
        Cancel Edit
      </button>
    )}
  </form>
</div>





      <h1 className="text-2xl mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <img src={p.image} alt={p.name} className="h-40 w-full object-cover mb-2" />
            <div className="font-semibold">{p.name}</div>
            <div>${p.price}</div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => startEdit(p)} className="px-2 py-1 border rounded">Edit</button>

              <button onClick={() => handleDelete(p._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
