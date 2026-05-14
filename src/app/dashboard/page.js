"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: "",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchDashboard = async () => {
    const res = await fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setDashboard(data);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
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

  if (!dashboard) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <p>Total Products: {dashboard.totalProducts}</p>
      <p>Total Quantity: {dashboard.totalQuantity}</p>

      <h2 className="mt-4 font-semibold">Low Stock</h2>
      {dashboard.lowStockItems.map((item) => (
        <div key={item.id}>
          {item.name} - {item.quantity}
        </div>
      ))}

      <hr className="my-6" />

      <h2 className="font-semibold">Add Product</h2>

      <form onSubmit={handleAddProduct} className="flex gap-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <button type="submit">Add</button>
      </form>

      <h2 className="mt-6 font-semibold">Products</h2>

      {products.map((p) => (
        <div key={p.id} className="border p-2 my-1">
          {p.name} | {p.sku} | Qty: {p.quantity}
        </div>
      ))}
    </div>
  );
}
