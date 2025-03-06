"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import "./sidebar.css";

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Clear authentication state
      logout();
      // Redirect to login page
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="sidebar">
      {/* You can add additional sidebar content here if needed */}
      <div className="sidebar-footer" onClick={handleLogout}>
        <img src="/logout.svg" alt="Logout" className="logout-icon" />
      </div>
    </aside>
  );
}
