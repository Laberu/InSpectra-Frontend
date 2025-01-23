// src/components/Navbar.js
"use client";

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav style={styles.navbarContainer}>
      <div style={styles.navbar}>
        <ul style={styles.navItems}>
          <li style={styles.navItem}>Product</li>
          <li style={styles.navItem}>Technology</li>
          <li style={styles.navItem}>Service</li>
          <li style={styles.navItem}>Information</li>
          <li style={styles.navItem}>Contact</li>
        </ul>
        <div style={styles.buttonGroup}>
          <button style={styles.loginButton} onClick={() => router.push('/login')}>
            Login
          </button>
          <button style={styles.getStartedButton} onClick={() => router.push('/register')}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbarContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    zIndex: 1000, // Keeps it above other elements
  },
  navbar: {
    width: '1400px',
    maxWidth: '100%',
    backgroundColor: '#1C1C1E', // Dark background color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 30px',
    borderRadius: '57px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  navItems: {
    display: 'flex',
    gap: '44px', // Set space between nav items to 44px
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    fontFamily: "'Inter', sans-serif", // Apply Inter font
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  loginButton: {
    backgroundColor: '#2C2C2E', // Dark button color for Login
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '16px', // Set font size to 16px for Login
    fontWeight: '600',
    fontFamily: "'Inter', sans-serif", // Apply Inter font
    cursor: 'pointer',
  },
  getStartedButton: {
    backgroundColor: '#E63946', // Red button color for Get Started
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '16px', // Set font size to 16px for Get Started
    fontWeight: '600',
    fontFamily: "'Inter', sans-serif", // Apply Inter font
    cursor: 'pointer',
  },
};
