'use client';
import DownloadCard from '@/components/DownloadCard';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/styles/download.module.css';

export default function DownloadPage() {
  const downloadOptions = [
    {
      title: 'Tải cho Android (APK)',
      description: 'Cài đặt trực tiếp file APK dành cho tất cả dòng máy chạy hệ điều hành Android. Dung lượng nhẹ, mượt mà.',
      downloadUrl: '/pb/nsokojin.apk',
      badge: 'Phổ biến',
    },
    {
      title: 'Tải cho iOS (iPhone)',
      description: 'Chơi game trực tiếp trên iPhone qua link TestFlight hoặc cài đặt file IPA của nhà phát hành.',
      downloadUrl: '#',
      badge: 'iOS',
    },
    {
      title: 'Tải cho Máy Tính (PC)',
      description: 'Phiên bản chuyên dụng dành cho hệ điều hành Windows. Tích hợp sẵn phím tắt và giả lập tối ưu.',
      downloadUrl: '/pb/PC_NSO.zip',
      badge: 'Tốc độ cao',
    },
    {
      title: 'Java 1.4.8 (x1)',
      description: 'Bản Jar gốc chuẩn 1.4.8 cho các bạn chơi giả lập MicroEmulator hoặc J2ME Loader.',
      downloadUrl: '/pb/NSO148x1.jar',
    },
    {
      title: 'Java 1.4.8 (x3)',
      description: 'Bản Mod tốc độ x3, hỗ trợ auto click, auto hồi hp/mp và nhiều tính năng mod tiện ích khác.',
      downloadUrl: '/pb/NSO148x3.jar',
    },
    {
      title: 'Java 2.1.7 (x1)',
      description: 'Bản cập nhật Java 2.1.7 giúp tối ưu đồ họa, sửa lỗi kết nối và đồng bộ tốt hơn.',
      downloadUrl: '/pb/NSO217x1.jar',
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
