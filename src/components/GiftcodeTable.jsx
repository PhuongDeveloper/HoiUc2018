'use client';
import { useState } from 'react';
import styles from '@/styles/giftcode.module.css';

export default function GiftcodeTable({ giftcodes }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Giftcode</th>
            <th style={{ width: '70%' }}>Danh sách vật phẩm</th>
          </tr>
        </thead>
        <tbody>
          {giftcodes.map((code) => (
            <tr key={code.id}>
              <td>
                <div className={styles.codeCell}>
                  <span className={styles.codeText}>{code.code}</span>
                  <button
                    className={`${styles.copyBtn} ${copiedId === code.id ? styles.copied : ''}`}
                    onClick={() => handleCopy(code.code, code.id)}
                  >
                    {copiedId === code.id ? 'Đã copy' : 'Sao chép'}
                  </button>
                </div>
              </td>
              <td>
                <ul className={styles.itemList}>
                  {code.coin > 0 && (
                    <li className={styles.itemRow}>
                      <img src="/img/yen2.png" className={styles.itemIcon} alt="Xu" />
                      <span>Xu x {code.coin.toLocaleString()}</span>
                    </li>
                  )}
                  {code.gold > 0 && (
                    <li className={styles.itemRow}>
                      <img src="/img/luong.png" className={styles.itemIcon} alt="Lượng" />
                      <span>Lượng x {code.gold.toLocaleString()}</span>
                    </li>
                  )}
                  {code.yen > 0 && (
                    <li className={styles.itemRow}>
                      <img src="/img/yen.png" className={styles.itemIcon} alt="Yên" />
                      <span>Yên x {code.yen.toLocaleString()}</span>
                    </li>
                  )}
                  {code.itemsList && code.itemsList.map((item, idx) => (
                    <li key={idx} className={styles.itemRow}>
                      {item.icon ? (
                        <img src={item.icon} className={styles.itemIcon} alt={item.name} />
                      ) : (
                        <div className={styles.itemIconPlaceholder} />
                      )}
                      <span>{item.name} x {item.quantity}</span>
                    </li>
                  ))}
                  {!(code.coin > 0) && !(code.gold > 0) && !(code.yen > 0) && (!code.itemsList || code.itemsList.length === 0) && (
                    <li className={styles.noItem}>Không có quà tặng</li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
