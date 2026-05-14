"use client";

import { useEffect, useState } from "react";

export default function Settings() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/settings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setValue(data?.defaultLowStockThreshold || 5);
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);

    await fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        defaultLowStockThreshold: Number(value),
      }),
    });

    setLoading(false);
    alert("Saved");
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-semibold mb-4">Settings</h1>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 mr-2"
      />

      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2">
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
