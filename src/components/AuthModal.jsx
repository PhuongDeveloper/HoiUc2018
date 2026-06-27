'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/auth.module.css';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!username || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      setLoading(false);
      return;
    }

    if (activeTab === 'register') {
      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp.');
        setLoading(false);
        return;
      }

      if (username.length < 4) {
        setError('Tài khoản phải có ít nhất 4 ký tự.');
        setLoading(false);
        return;
      }

      if (password.length < 3) {
        setError('Mật khẩu phải có ít nhất 3 ký tự.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!data.success) {
          setError(data.message || 'Đăng ký thất bại.');
          setLoading(false);
          return;
        }

        setSuccess('Đăng ký thành công! Đang tự động đăng nhập...');
        
        // Auto sign in after successful registration
        const signInRes = await signIn('credentials', {
          username,
          password,
          redirect: false,
        });

        if (signInRes?.error) {
          setError('Không thể đăng nhập tự động. Vui lòng thử đăng nhập lại.');
          setActiveTab('login');
          setLoading(false);
        } else {
          setTimeout(() => {
            setLoading(false);
            onClose();
            router.push('/profile');
            router.refresh();
          }, 1500);
        }

      } catch (err) {
        setError('Có lỗi xảy ra, vui lòng thử lại sau.');
        setLoading(false);
      }
    } else {
      // Login flow
      try {
        const res = await signIn('credentials', {
          username,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError('Tài khoản hoặc mật khẩu không chính xác.');
          setLoading(false);
        } else {
          setSuccess('Đăng nhập thành công!');
          setTimeout(() => {
            setLoading(false);
            onClose();
            router.push('/profile');
            router.refresh();
          }, 1000);
        }
      } catch (err) {
        setError('Đăng nhập thất bại, vui lòng thử lại.');
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.modalTitle}>Chào mừng bạn</h2>
        <p className={styles.modalSubtitle}>Đến với thế giới Hồi Ức 2018 Ninja</p>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'login' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Đăng nhập
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'register' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Đăng ký
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Tài khoản</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Nhập tên tài khoản..."
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Mật khẩu</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {activeTab === 'register' && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Xác nhận mật khẩu</label>
              <input
                type="password"
                className={styles.input}
                placeholder="Nhập lại mật khẩu..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner} />
                Vui lòng đợi...
              </>
            ) : activeTab === 'login' ? (
              'Đăng nhập'
            ) : (
              'Đăng ký tài khoản'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
