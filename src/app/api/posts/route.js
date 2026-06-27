import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.$queryRaw`SELECT * FROM posts ORDER BY id DESC LIMIT 6`;

    // Safely convert BigInt to Number
    const serializedPosts = posts.map(post => ({
      ...post,
      id: Number(post.id),
    }));

    return NextResponse.json(serializedPosts);
  } catch (error) {
    console.error('Fetch posts error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
