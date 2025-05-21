import { NextResponse } from 'next/server';
import { dbOps } from '@/app/lib/db';

export async function GET() {
  try {
    const transactions = dbOps.getAllTransactions();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
} 