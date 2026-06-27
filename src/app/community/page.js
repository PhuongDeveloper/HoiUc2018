'use client';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/styles/download.module.css';

export default function CommunityPage() {
  const socialOptions = [
    {
      title: 'Nhóm Zalo Trao Đổi',
      description: 'Tham gia nhóm Zalo cộng đồng lớn mạnh. Nơi mua bán, trao đổi kinh nghiệm, tìm tổ đội và thảo luận sự kiện.',
      url: 'https://zalo.me/g/hoiuc2018',
      badge: 'Zalo',
    },
    {
      title: 'Fanpage Facebook',
      description: 'Theo dõi Trang chủ Facebook của Hồi Ức 2018 để nhận tin tức cập nhật chính thức, giftcode sự kiện và phản hồi hỗ trợ.',
      url: 'https://facebook.com/hoiuc2018',
      badge: 'Facebook',
    },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <AnimatedSection>
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Kết Nối Cộng Đồng</h1>
            <p className={styles.headerDesc}>
              Đồng hành cùng hàng ngàn game thủ khác qua các kênh thông tin và nhóm cộng đồng chính thức của máy chủ Hồi Ức 2018.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {socialOptions.map((opt, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={styles.card}>
                <span className={styles.badge}>{opt.badge}</span>
                <h3 className={styles.cardTitle}>{opt.title}</h3>
                <p className={styles.cardDesc}>{opt.description}</p>
                <a href={opt.url} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
                  Tham Gia Ngay
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
