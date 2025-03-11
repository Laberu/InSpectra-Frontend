"use client";

import styles from "./ProjectCard.module.css";

export default function ProjectCard({ model, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.thumbnail}>
        {model.thumbnail ? (
          <img src={model.thumbnail} alt={model.name} />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{model.name}</h3>
        {/* Status: If model.status exists, display approval; otherwise, show processing */}
        <div className={styles.status}>
          {model.status ? (
            <span className={styles.approved}>Approved</span>
          ) : (
            <span className={styles.processing}>Processing</span>
          )}
        </div>
      </div>
    </div>
  );
}
