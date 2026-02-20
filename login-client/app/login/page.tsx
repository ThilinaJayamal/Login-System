"use client";
import { useState } from "react";
import axios from "axios";



export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setApiError("");
    setLoading(true);

    if (!username || !password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }


    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        { username, password },
        { withCredentials: true }
      );
      setApiError("");
      window.location.href = "/";
    } catch (err: any) {
      const data = err?.response?.data;
      setApiError(
        data?.errors?.password || data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">Login</h2>
        {/* Show validation or API errors */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>
        )}
        {apiError && !error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{apiError}</div>
        )}
        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center text-sm mt-2">
          Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
}
