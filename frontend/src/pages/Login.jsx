import { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async () => {
    const res = await login(form);
    localStorage.setItem("user", JSON.stringify(res.data));
    onLogin(res.data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-900 p-6 rounded shadow-lg text-white">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          className="block mb-3 p-2 rounded bg-gray-800"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="block mb-3 p-2 rounded bg-gray-800"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
