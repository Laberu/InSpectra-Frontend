"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Section: Columns */}
      <div className={styles.topSection}>
        
        {/* Brand / Intro Column */}
        <div className={styles.brandSection}>
          {/* Logo (update path and dimensions as needed) */}
          <div className={styles.logoContainer}>
            <Image
              src="/logo.png"
              alt="InSpectra Logo"
              width={120}
              height={40}
              className={styles.logo}
            />
          </div>
          <p className={styles.brandDesc}>
            Leading the way in AI-powered inspections and data-driven insights.
          </p>
        </div>

       
      </div>

      {/* Bottom Section: Copyright */}
      <div className={styles.bottomSection}>
        <p>© {new Date().getFullYear()} InSpectra. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <Link href="/">Terms of Service</Link>
          <Link href="/">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
