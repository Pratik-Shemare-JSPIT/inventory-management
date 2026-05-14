"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: "",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const fetchDashboard = async () => {
    const res = await fetch("/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      handleLogout();
      return;
    }

    const data = await res.json();
    setDashboard(data);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      handleLogout();
      return;
    }

    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    fetchDashboard();
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        quantity: Number(form.quantity),
      }),
    });

    setForm({ name: "", sku: "", quantity: "" });

    fetchProducts();
    fetchDashboard();
  };

  if (!dashboard) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Inventory Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-3xl font-semibold text-blue-600">
            {dashboard.totalProducts}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Quantity</p>
          <h2 className="text-3xl font-semibold text-blue-600">
            {dashboard.totalQuantity}
          </h2>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="font-semibold mb-3 text-red-500">Low Stock Items</h2>

        {dashboard.lowStockItems.length === 0 ? (
          <p className="text-gray-500">No low stock items</p>
        ) : (
          dashboard.lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-gray-100 py-2 text-sm"
            >
              <span>{item.name}</span>
              <span className="text-red-500 font-semibold">
                {item.quantity}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="font-semibold mb-4">Add Product</h2>

        <form
          onSubmit={handleAddProduct}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
          />

          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg px-4 py-2 font-medium">
            Add
          </button>
        </form>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="font-semibold mb-4">Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products added</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-gray-500 text-sm">{p.sku}</p>
                </div>

                <p className="font-semibold text-gray-700">Qty: {p.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
