'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/styles/profile.module.css';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className={styles.page}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className={styles.page}>
      <div className="container">
        <AnimatedSection>
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Quản Lý Tài Khoản</h1>
            <p className={styles.headerDesc}>
              Thông tin chi tiết tài khoản nhân vật game và ví điện tử của bạn tại hệ thống Hồi Ức 2018.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className={styles.profileCard}>
            <div className={styles.avatarLarge}>
              {user.username?.[0]?.toUpperCase() || 'U'}
            </div>
            
            <h2 className={styles.username}>{user.username}</h2>
            <div className={styles.userLevel}>
              Cấp độ: {user.level === 'admin' ? 'Admin' : 'Thành Viên'}
            </div>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ID tài khoản</span>
                <span className={styles.infoValue}>#{user.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Số dư ví (Coin)</span>
                <span className={styles.infoValue} style={{ color: 'var(--accent-red)' }}>
                  {(user.balance || 0).toLocaleString()} Coin
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Lượng trong game</span>
                <span className={styles.infoValue} style={{ color: 'var(--text-primary)' }}>
                  {(user.luong || 0).toLocaleString()} Lượng
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Trạng thái tài khoản</span>
                <span className={styles.infoValue} style={{ color: '#2e7d32' }}>
                  Hoạt động
                </span>
              </div>
            </div>

            <button className={styles.logoutBtn} onClick={() => signOut({ callbackUrl: '/' })}>
              Đăng xuất tài khoản
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
