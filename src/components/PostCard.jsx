'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '@/styles/post.module.css';

export default function PostCard({ post }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Gần đây';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    } catch (e) {
      return dateStr;
    }
  };
  const formattedDate = formatDate(post.created_at);

  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <div className={styles.cardMeta}>
        <span className={styles.cardDate}>{formattedDate}</span>
        {post.views > 0 && <span className={styles.cardViews}>{post.views} lượt xem</span>}
      </div>

      <h3 className={styles.cardTitle}>
        <Link href={`/post/${post.id}`}>{post.title}</Link>
      </h3>

      <p className={styles.cardExcerpt}>
        Nhấn vào tiêu đề để xem chi tiết bài viết này. Tìm hiểu các hướng dẫn chơi game, mẹo săn boss, hay các sự kiện đặc sắc đang diễn ra.
      </p>

      <Link href={`/post/${post.id}`} className={styles.readMore}>
        Đọc tiếp
      </Link>
    </motion.article>
  );
}
