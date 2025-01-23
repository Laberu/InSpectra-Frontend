// src/app/dashboard.js
"use client";

import { useAuth } from '../context/AuthContext';
import { modelsData } from '../data/modelsData';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleModelClick = (modelId) => {
    router.push(`/viewer/${modelId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={logout}
        style={{
          padding: '10px',
          backgroundColor: '#f00',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Logout
      </button>
      
      <h1>Select a Model</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {modelsData.map((model) => (
          <li
            key={model.id}
            onClick={() => handleModelClick(model.id)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: '#f5f5f5',
            }}
          >
            {model.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
