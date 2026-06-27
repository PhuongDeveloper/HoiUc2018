'use client';
import { motion } from 'framer-motion';
import styles from '@/styles/download.module.css';

export default function DownloadCard({ title, description, downloadUrl, badge }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      {badge && <span className={styles.badge}>{badge}</span>}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
      <a href={downloadUrl} className={styles.downloadBtn} download>
        Tải Xuống
      </a>
    </motion.div>
  );
}
