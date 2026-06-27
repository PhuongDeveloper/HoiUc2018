'use client';
import styles from '@/styles/zalo.module.css';

export default function ZaloButton() {
  return (
    <a
      href="https://zalo.me/g/hoiuc2018"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.zaloButton}
    >
      <span className={styles.zaloText}>Zalo Group</span>
    </a>
  );
}
