import { PrismaClient } from '@prisma/client';

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '3306';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'ninjaschool';

// Construct dynamic MySQL connection string for runtime
const databaseUrl = `mysql://${dbUser}:${encodeURIComponent(dbPassword)}@${dbHost}:${dbPort}/${dbName}`;

console.log(`[Database] Khởi tạo kết nối: Host=${dbHost}, Port=${dbPort}, User=${dbUser}, DB=${dbName}, Mật khẩu dài=${dbPassword.length} ký tự`);

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: ['info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Test connection immediately in background to log error details
prisma.$connect()
  .then(() => {
    console.log(`[Database] Kết nối thành công tới cơ sở dữ liệu: ${dbHost}:${dbPort}/${dbName}`);
  })
  .catch((err) => {
    console.error(`[Database] !!! LỖI KẾT NỐI DATABASE !!!`);
    console.error(`- Chuỗi kết nối đang dùng: mysql://${dbUser}:***@${dbHost}:${dbPort}/${dbName}`);
    console.error(`- Chi tiết lỗi từ MySQL/Prisma:`, err.message || err);
  });

export default prisma;
