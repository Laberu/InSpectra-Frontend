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

        {/* Help & Support Column */}
        <div className={styles.linkSection}>
          <h4>Help &amp; Support</h4>
          <ul>
            <li><Link href="/faq">Getting Started/FAQ</Link></li>
            <li><Link href="/video-tour">Video Tour</Link></li>
            <li><Link href="/commands">Dial Pad Commands</Link></li>
            <li><Link href="/transcription">Call Transcription Center</Link></li>
          </ul>
        </div>

        {/* Product Features Column */}
        <div className={styles.linkSection}>
          <h4>Product Features</h4>
          <ul>
            <li><Link href="/screen-sharing">Screen Sharing</Link></li>
            <li><Link href="/video-conferencing">Video Conferencing</Link></li>
            <li><Link href="/audio">Global Web Audio</Link></li>
            <li><Link href="/branding">Branded Greeting</Link></li>
            <li><Link href="/tollfree">Toll-Free Call</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className={styles.linkSection}>
          <h4>Contact Us</h4>
          <p>service@inspectra.com</p>
          <p>+1 (555) 123-4567</p>
          <p>123 InSpectra Rd, Suite 200</p>
          <p>El Sedangado, CA 94505, US</p>
          
          {/* Social Icons (example) */}
          <div className={styles.socialIcons}>
            <Link href="https://twitter.com">
              <Image
                src="/icons/twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://facebook.com">
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://linkedin.com">
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className={styles.bottomSection}>
        <p>© {new Date().getFullYear()} InSpectra LTD. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
