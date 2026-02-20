"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


function isStrongPassword(password:string) {
  // At least 8 chars, 1 upper, 1 lower, 1 number, 1 special
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
}


function getApiError(err:any) {
  if (err?.response?.data) {
    const data = err.response.data;
    return data?.errors?.password || data?.message || `Sign up failed. (${err.response.status})`;
  }
  return "Network error. Please try again.";
}

function validatePassword(password: string) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]).{8,}$/;
  return passwordRegex.test(password);
}

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setApiError("");
    setLoading(true);

    if (!form.username || !form.password || !form.name) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (!isStrongPassword(form.password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/auth/signup",
        { ...form },
        { headers: { "Content-Type": "application/json" } }
      );
      router.replace("/");
    } catch (err) {
      setApiError(getApiError(err));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">Sign Up</h2>
        {/* Show validation, API errors */}
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>}
        {apiError && !error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{apiError}</div>}
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            autoComplete="new-password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="text-center text-sm mt-2">
          Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}
