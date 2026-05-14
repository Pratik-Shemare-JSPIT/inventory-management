"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Settings() {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
    toast.success("Settings saved");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm"
        >
          Back
        </button>
      </div>

      <div className="max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          Inventory Settings
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Set default threshold for low stock alerts
        </p>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Default Low Stock Threshold
          </label>

          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-lg font-medium"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
