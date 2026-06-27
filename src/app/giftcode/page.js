'use client';
import { useState, useEffect } from 'react';
import GiftcodeTable from '@/components/GiftcodeTable';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/styles/giftcode.module.css';

export default function GiftcodePage() {
  const [giftcodes, setGiftcodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/giftcodes')
      .then((r) => r.json())
      .then((data) => {
        setGiftcodes(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.page}>
      <div className="container">
        <AnimatedSection>
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Giftcode Hàng Tuần</h1>
            <p className={styles.headerDesc}>
              Nhận ngay các phần quà hấp dẫn từ ban quản trị để hỗ trợ trải nghiệm tân thủ. Copy mã code và nhập vào game.
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <AnimatedSection style={{ textAlign: 'center', padding: '40px 0' }}>
            <div>Đang tải danh sách giftcode...</div>
          </AnimatedSection>
        ) : giftcodes.length === 0 ? (
          <AnimatedSection style={{ textAlign: 'center', padding: '40px 0' }}>
            <div>Hiện tại không có giftcode nào khả dụng. Vui lòng quay lại sau!</div>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={0.1}>
            <GiftcodeTable giftcodes={giftcodes} />
          </AnimatedSection>
        )}

        <AnimatedSection delay={0.2}>
          <div className={styles.guide}>
            <h3 className={styles.guideTitle}>Hướng dẫn nhập code trong game</h3>
            <p className={styles.guideText}>
              Bước 1: Vào game bằng nhân vật của bạn.<br />
              Bước 2: Tìm và đối thoại với NPC <strong>Okanechan</strong> tại các Trường học hoặc Làng.<br />
              Bước 3: Chọn phần <strong>"Nhập Giftcode"</strong>.<br />
              Bước 4: Nhập chính xác mã code đã sao chép từ trang web và ấn <strong>Xác nhận</strong>.<br />
              Bước 5: Kiểm tra Rương đồ của bạn để nhận vật phẩm tương ứng!
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
