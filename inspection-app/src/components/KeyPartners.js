"use client";
import Image from "next/image";
import styles from "./KeyPartners.module.css"; // Import CSS module (or regular CSS)

export default function KeyPartners() {
  // Example partner data. Replace these paths with your actual logo files.
  const partners = [
    { id: 1, name: "Partner 1", src: "/logos/partner1.png" },
    { id: 2, name: "Partner 2", src: "/logos/partner2.png" },
    { id: 3, name: "Partner 3", src: "/logos/partner3.png" },
    { id: 4, name: "Partner 4", src: "/logos/partner4.png" },
    { id: 5, name: "Partner 5", src: "/logos/partner5.png" },
    { id: 6, name: "Partner 6", src: "/logos/partner6.png" },
    { id: 7, name: "Partner 7", src: "/logos/partner7.png" },
    { id: 8, name: "Partner 8", src: "/logos/partner8.png" },
  ];

  return (
    <section className={styles.keyPartnersSection}>
      <h2 className={styles.sectionTitle}>KEY PARTNERS</h2>
      <div className={styles.logosContainer}>
        {partners.map((partner) => (
          <div key={partner.id} className={styles.logoWrapper}>
            {/* Using Next.js <Image> for optimized loading */}
            <Image
              src={partner.src}
              alt={partner.name}
              width={100}
              height={100}
              className={styles.partnerLogo}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
