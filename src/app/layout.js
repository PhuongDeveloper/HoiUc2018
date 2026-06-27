import { Nunito, Quicksand } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const nunito = Nunito({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body-next',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700'],
  variable: '--font-heading-next',
  display: 'swap',
});

export const metadata = {
  title: 'Hồi Ức 2018 - Ninja School Online',
  description: 'Thức tỉnh huyền thoại nhân giả. Tham gia Hồi Ức 2018 - server Ninja School Online hàng đầu với giao diện tuyệt đẹp.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${nunito.variable} ${quicksand.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
