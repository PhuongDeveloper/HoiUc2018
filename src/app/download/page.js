'use client';
import DownloadCard from '@/components/DownloadCard';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/styles/download.module.css';

export default function DownloadPage() {
    const downloadOptions = [
      {
        title: 'Java 1.4.8',
        description: 'Bản Jar gốc chuẩn 1.4.8 cho các bạn chơi giả lập MicroEmulator hoặc J2ME Loader.',
        downloadUrl: 'https://drive.google.com/file/d/132haDuUD6NdK__9quFJTuvIis4zKFZ9A/view?usp=sharing',
        badge: 'Khuyên dùng',
      },
      {
        title: 'Java 2.1.7',
        description: 'Bản cập nhật Java 2.1.7 giúp tối ưu đồ họa, sửa lỗi kết nối và đồng bộ tốt hơn.',
        downloadUrl: 'https://drive.google.com/file/d/1Df6aYSFE012AVuXSUE6SJsEu2ahLBKqU/view?usp=drive_link',
      },
    ];

  return (
    <div className={styles.page}>
      <div className="container">
        <AnimatedSection>
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Tải Game Đa Nền Tảng</h1>
            <p className={styles.headerDesc}>
              Hỗ trợ đầy đủ các phiên bản dành cho điện thoại Android, iPhone, Máy tính và các bản giả lập Java phổ biến.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {downloadOptions.map((opt, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <DownloadCard
                title={opt.title}
                description={opt.description}
                downloadUrl={opt.downloadUrl}
                badge={opt.badge}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
