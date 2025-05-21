import { NextResponse } from 'next/server';
import { dbOps } from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_name, amount, currency} = body;

    // Validate required fields
    if (!customer_name || amount === undefined || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the transaction
    const transaction = dbOps.createTransaction(customer_name, amount, currency);

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const transactions = dbOps.getAllTransactions();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
} 