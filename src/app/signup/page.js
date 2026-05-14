"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    organizationName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      router.push("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="p-10">
      <h1>Signup</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          placeholder="Organization"
          onChange={(e) =>
            setForm({ ...form, organizationName: e.target.value })
          }
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
