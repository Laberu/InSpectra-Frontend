"use client";

import { useState } from "react";
import "./topsearchbar.css";

export default function TopSearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="top-search-bar">
      <input 
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
