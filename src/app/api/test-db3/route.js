import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const userDesc = await prisma.$queryRawUnsafe("DESCRIBE player;"); // Let's check player table first, or user table
    
    // Wait, the table might be called 'player' instead of 'user'. Let's check 'user' first.
    let tableDesc = null;
    try {
      tableDesc = await prisma.$queryRawUnsafe("DESCRIBE user;");
    } catch (e) {
      tableDesc = { error: e.message };
    }

    let playerDesc = null;
    try {
      playerDesc = await prisma.$queryRawUnsafe("DESCRIBE player;");
    } catch (e) {
      playerDesc = { error: e.message };
    }

    return new Response(JSON.stringify({ tableDesc, playerDesc }, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
