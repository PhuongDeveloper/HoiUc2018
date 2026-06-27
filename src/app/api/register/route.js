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

    if (username.length < 4 || !/^[a-z0-9]+$/.test(username)) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản phải từ 4 ký tự trở lên và chỉ gồm chữ thường & số.' },
        { status: 400 }
      );
    }

    if (password.length < 3) {
      return NextResponse.json(
        { success: false, message: 'Mật khẩu phải từ 3 ký tự trở lên.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản đã tồn tại trên hệ thống.' },
        { status: 400 }
      );
    }

    // Create user (plaintext password as requested)
    await prisma.user.create({
      data: {
        username,
        password,
        balance: 0,
        luong: 0,
        level: 'member',
        banned: 'OFF',
        activated: 1,
        kichhoat: 0,
        total_money: 0,
        tongnap: 0,
        status: 0,
        coin: 0,
        createtime: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      { success: true, message: 'Đăng ký thành công!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra trong quá trình xử lý.' },
      { status: 500 }
    );
  }
}
