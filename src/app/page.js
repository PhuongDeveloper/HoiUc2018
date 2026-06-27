'use client';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/styles/post.module.css';
import featStyles from '@/styles/features.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(() => {});
  }, []);

  const features = [
    {
      title: 'Cộng đồng sôi động',
      desc: 'Hàng ngàn người chơi đang chờ bạn. Kết bạn, lập tổ đội và chinh phục thế giới ninja.',
    },
    {
      title: 'Cập nhật liên tục',
      desc: 'Sự kiện mới, vật phẩm mới, phó bản mới được cập nhật thường xuyên mỗi tuần.',
    },
    {
      title: 'Tải miễn phí',
      desc: 'Hỗ trợ đa nền tảng: Android, iOS, PC, Java. Tải và chơi ngay không tốn phí.',
    },
  ];

  const handleRegisterClick = () => {
    window.dispatchEvent(new Event('trigger-register'));
  };

  return (
    <>
      <Hero onRegisterClick={handleRegisterClick} />
      
      <section className={featStyles.section}>
        <div className={featStyles.sectionBg} />
        <div className="container">
          <div className={featStyles.grid}>
            {features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={featStyles.card}>
                  <h3 className={featStyles.cardTitle}>{f.title}</h3>
                  <p className={featStyles.cardDesc}>{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Tin tức <span className="gradient-text">mới nhất</span></h2>
              <p className={styles.sectionSubtitle}>Cập nhật thông tin, sự kiện và hướng dẫn chơi game</p>
            </div>
          </AnimatedSection>
          <div className={styles.grid}>
            {posts.length === 0 ? (
              <AnimatedSection className="grid-colspan-3" style={{ gridColumn: 'span 3', textAlign: 'center' }}>
                <div className={styles.card} style={{ cursor: 'default' }}>
                  <h3 className={styles.cardTitle}>Đang tải tin tức...</h3>
                  <p className={styles.cardExcerpt}>Kết nối máy chủ để cập nhật các bài viết mới nhất.</p>
                </div>
              </AnimatedSection>
            ) : (
              posts.slice(0, 6).map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 0.05}>
                  <PostCard post={post} />
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
