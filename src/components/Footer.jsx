'use client';
import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link href="/" className={styles.footerLogo}>
          HỒI ỨC 2018
        </Link>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>Trang chủ</Link>
          <Link href="/giftcode" className={styles.footerLink}>Giftcode</Link>
          <Link href="/download" className={styles.footerLink}>Tải Game</Link>
          <Link href="/community" className={styles.footerLink}>Cộng đồng</Link>
        </div>
      </div>
      <div className={styles.copyright}>
        © {currentYear} Hồi Ức 2018 Ninja Online. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}
