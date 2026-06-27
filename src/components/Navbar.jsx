'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/navbar.module.css';

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Trang chủ' },
    { href: '/giftcode', label: 'Giftcode' },
    { href: '/download', label: 'Tải Game' },
    { href: '/community', label: 'Cộng đồng' },
  ];

  return (
    <>
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.gif" className={styles.logoImg} alt="Hồi Ức 2018" />
          <div>
            <div className={styles.logoTitle}>HỒI ỨC 2018</div>
            <div className={styles.logoSub}>NINJA ONLINE</div>
          </div>
        </Link>

        <ul className={styles.navLinks}>
          {links.map(link => (
            <li key={link.href}>
              <Link href={link.href} className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.authButtons}>
          {session ? (
            <>
              <Link href="/profile" className={styles.userGreeting}>
                <span className={styles.userAvatar}>{session.user?.username?.[0]?.toUpperCase() || 'U'}</span>
                {session.user?.username}
              </Link>
              <button className={styles.btnLogin} onClick={() => signOut({ callbackUrl: '/' })}>Đăng xuất</button>
            </>
          ) : (
            <>
              <button className={styles.btnLogin} onClick={onLoginClick}>Đăng nhập</button>
              <button className={styles.btnRegister} onClick={onRegisterClick}>Đăng ký</button>
            </>
          )}
        </div>

        <button className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

    </header>

    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          className={`${styles.mobileMenu} ${styles.mobileMenuOpen}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {links.map(link => (
            <Link key={link.href} href={link.href} className={styles.navLink} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link href="/profile" className={styles.navLink} onClick={() => setMobileOpen(false)}>Hồ sơ</Link>
              <button className={styles.btnLogin} onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false); }}>Đăng xuất</button>
            </>
          ) : (
            <>
              <button className={styles.btnLogin} onClick={() => { onLoginClick(); setMobileOpen(false); }}>Đăng nhập</button>
              <button className={styles.btnRegister} onClick={() => { onRegisterClick(); setMobileOpen(false); }}>Đăng ký</button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
