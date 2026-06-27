import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const unwrappedParams = await params;
    const id = parseInt(unwrappedParams.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    const posts = await prisma.$queryRaw`SELECT * FROM posts WHERE id = ${id} LIMIT 1`;
    const post = posts[0];

    if (!post) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    // Increment view count using raw SQL
    await prisma.$queryRaw`UPDATE posts SET views = views + 1 WHERE id = ${id}`;

    // Safely convert BigInt to Number
    const serializedPost = {
      ...post,
      id: Number(post.id),
    };

    return NextResponse.json(serializedPost);
  } catch (error) {
    console.error('Fetch post detail error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
