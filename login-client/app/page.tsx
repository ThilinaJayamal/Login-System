"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Helper to check authentication status
async function checkAuth() {
  try {
    const res = await fetch("http://localhost:8080/user/me", {
      credentials: "include"
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await checkAuth();
      if (!user) {
        router.replace("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!user) {
    return null;
  }

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      // Optionally handle error
    }
    router.replace("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Welcome, {user.name || user.username}!</h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
