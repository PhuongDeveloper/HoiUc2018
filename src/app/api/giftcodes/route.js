import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function serializeBigInt(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return Number(obj);
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = serializeBigInt(obj[key]);
    }
    return newObj;
  }
  return obj;
}

export async function GET() {
  try {
    const giftcodes = await prisma.$queryRaw`SELECT * FROM gift_codes`;
    
    // Fetch all items from the database using raw SQL
    let items = [];
    try {
      items = await prisma.$queryRaw`SELECT id, name, icon FROM item`;
    } catch (e) {
      console.error('Error fetching items for giftcode mapping:', e);
    }
    
    const itemMap = {};
    if (Array.isArray(items)) {
      items.forEach(it => {
        itemMap[it.id] = { name: it.name, icon: it.icon };
      });
    }

    const enrichedGiftcodes = giftcodes.map(gc => {
      let itemsList = [];
      if (gc.items) {
        try {
          const parsed = JSON.parse(gc.items);
          if (Array.isArray(parsed)) {
            itemsList = parsed.map(p => {
              const mappedItem = itemMap[p.id] || {};
              return {
                id: p.id,
                quantity: p.quantity,
                name: mappedItem.name || `Vật phẩm #${p.id}`,
                icon: mappedItem.icon !== undefined ? `/img/icon/Small${mappedItem.icon}.png` : null
              };
            });
          }
        } catch (e) {
          console.error('Error parsing items JSON for giftcode:', gc.id, e);
        }
      }
      return {
        ...gc,
        itemsList
      };
    });

    const serialized = serializeBigInt(enrichedGiftcodes);
    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Fetch giftcodes error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
