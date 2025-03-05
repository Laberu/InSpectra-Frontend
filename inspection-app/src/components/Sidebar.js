"use client";

import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Call your logout function if available, then redirect.
    router.push("/login");
  };

  return (
    <aside className={styles.sidebar}>
      {/* Brand / Logo */}
      <div className={styles.sidebarLogo}>
        <h2>InSpectra</h2>
        <p className={styles.subtitle}>Civil Engineering Tools</p>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navMenu}>
        <ul>
          <li onClick={() => router.push("/dashboard")}>Dashboard</li>
          <li onClick={() => router.push("/projects")}>Projects</li>
          <li onClick={() => router.push("/reports")}>Reports</li>
          <li onClick={() => router.push("/settings")}>User Settings</li>
          <li onClick={() => router.push("/ai-chat")}>AI Chat</li>
        </ul>
      </nav>

      {/* Logout Button */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
