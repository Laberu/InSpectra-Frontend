"use client";

import { useState } from "react";
import styles from "./TopSearchBar.module.css";

export default function TopSearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
