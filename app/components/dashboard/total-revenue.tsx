'use client';

import { formatAmount } from '@/app/lib/utils';

interface Transaction {
  id: number;
  date: string;
  customer_name: string;
  amount: number;
  currency: string;
}

interface TotalRevenueProps {
  transactions: Transaction[];
}

export default function TotalRevenue({ transactions }: TotalRevenueProps) {
  const revenueByCurrency = transactions.reduce((acc, t) => {
    acc[t.currency] = (acc[t.currency] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <span className="text-lg text-gray-900">Total Revenue:</span>
        {Object.entries(revenueByCurrency).map(([currency, amount], index, array) => (
          <span key={currency} className="text-gray-900">
            {formatAmount(amount, currency)}
            {index < array.length - 1 && <span className="mx-2">|</span>}
          </span>
        ))}
      </div>
    </div>
  );
} 