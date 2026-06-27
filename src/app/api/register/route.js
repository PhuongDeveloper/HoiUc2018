import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng cung cấp tài khoản và mật khẩu.' },
        { status: 400 }
      );
    }

    if (username.length < 4 || !/^[a-zA-Z0-9]+$/.test(username)) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản phải từ 4 ký tự trở lên và chỉ gồm chữ & số.' },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { success: false, message: 'Mật khẩu phải từ 4 ký tự trở lên.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.$queryRaw`SELECT id FROM users WHERE username = ${username} LIMIT 1`;
    
    if (existingUser && existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản đã tồn tại trên hệ thống.' },
        { status: 400 }
      );
    }

    // Create user using raw SQL to bypass Prisma generation errors
    // Based on old Xulylog.php, we insert: username, password, status, activated, tokenlog, createtime, ip
    const createtime = new Date().toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:mm:ss format
    
    await prisma.$executeRaw`
      INSERT INTO users (username, password, status, activated, createtime, ip, balance, luong, total_money, tongnap, coin)
      VALUES (${username}, ${password}, 0, 1, ${createtime}, '127.0.0.1', 0, 0, 0, 0, 0)
    `;

    return NextResponse.json(
      { success: true, message: 'Đăng ký thành công!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra trong quá trình xử lý. ' + (error.message || '') },
      { status: 500 }
    );
  }
}
