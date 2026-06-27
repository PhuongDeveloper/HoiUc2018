'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/styles/postDetail.module.css';

export default function PostDetailPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          Đang tải bài viết...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.page}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Không tìm thấy bài viết</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '16px 0' }}>Bài viết có thể đã bị xóa hoặc không tồn tại.</p>
          <Link href="/" className={styles.backLink}>Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <AnimatedSection>
          <article className={styles.article}>
            <Link href="/" className={styles.backLink}>
              Quay lại tin tức
            </Link>

            <h1 className={styles.title}>{post.title}</h1>
            
            <div className={styles.meta}>
              <span>{(() => {
                if (!post.created_at) return 'Gần đây';
                try {
                  const date = new Date(post.created_at);
                  if (isNaN(date.getTime())) return post.created_at;
                  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                } catch (e) {
                  return post.created_at;
                }
              })()}</span>
              <span>{post.views || 0} lượt xem</span>
              <span>Đăng bởi Admin</span>
            </div>

            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </AnimatedSection>
      </div>
    </div>
  );
}
