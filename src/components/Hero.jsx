'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '@/styles/hero.module.css';

export default function Hero({ onRegisterClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className="container">
          <motion.div
            className={styles.heroCard}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.heroLeft}>
              <motion.div className={styles.serverStatus} variants={itemVariants}>
                <span className={styles.statusDot} />
                Server đang mở — Awaken
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={itemVariants}>
                Thức tỉnh <span className={styles.heroTitleGradient}>Huyền thoại Nhân giả</span>
              </motion.h1>

              <motion.p className={styles.heroSubtitle} variants={itemVariants}>
                Cánh cổng HỒI ỨC 2018 đã mở — bước vào thế giới ninja, luyện cấp, lập tổ đội và tự tay viết nên huyền thoại của riêng bạn. Phiên bản hoạt hình 2D siêu tốc độ cực nhẹ và đẹp mắt!
              </motion.p>

              <motion.div className={styles.heroCta} variants={itemVariants}>
                <Link href="/download" className={`${styles.btnCta} ${styles.btnCtaPrimary}`}>
                  Tải Game Ngay
                </Link>
                <button className={`${styles.btnCta} ${styles.btnCtaSecondary}`} onClick={onRegisterClick}>
                  Đăng Ký Tài Khoản
                </button>
              </motion.div>
            </div>

            <motion.div className={styles.heroRight} variants={itemVariants}>
              <div className={styles.videoCard}>
                <video
                  src="/naruto-blue-sky-moewalls-com.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.videoPlayer}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
