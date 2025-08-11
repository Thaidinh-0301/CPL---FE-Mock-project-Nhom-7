import React, { useState } from 'react';

const Products: React.FC = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Book A', price: '$10', stock: 50 },
    { id: 2, name: 'Book B', price: '$15', stock: 30 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const [editProduct, setEditProduct] = useState(null);
  const [nextId, setNextId] = useState(3);

  const handleAdd = () => {
    setProducts([...products, { ...newProduct, id: nextId, price: `$${newProduct.price}`, stock: Number(newProduct.stock) }]);
    setNewProduct({ name: '', price: '', stock: '' });
    setNextId(nextId + 1);
  };

  const handleEdit = (product: any) => {
    setEditProduct(product);
    setNewProduct({ name: product.name, price: product.price.replace('$', ''), stock: product.stock.toString() });
  };

  const handleUpdate = () => {
    setProducts(products.map(p => p.id === editProduct.id ? { ...editProduct, name: newProduct.name, price: `$${newProduct.price}`, stock: Number(newProduct.stock) } : p));
    setEditProduct(null);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="mb-4">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Product Name"
            className="border p-2 rounded mr-2"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="Price"
            className="border p-2 rounded mr-2"
          />
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            placeholder="Stock"
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={editProduct ? handleUpdate : handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editProduct ? 'Update' : 'Add'}
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Stock</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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

export default Products;