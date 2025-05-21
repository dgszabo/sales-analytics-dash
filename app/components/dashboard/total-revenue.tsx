'use client';

import { formatAmount } from '@/app/lib/utils';

interface Transaction {
  amount: number;
  currency: string;
}

interface TotalRevenueProps {
  transactions: Transaction[];
}

export default function TotalRevenue({ transactions }: TotalRevenueProps) {
  // Calculate total revenue by currency
  const revenueByCurrency = transactions.reduce((acc, transaction) => {
    const { amount, currency } = transaction;
    acc[currency] = (acc[currency] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  // Define fixed currency order
  const currencyOrder = ['USD', 'EUR', 'GBP'];
  
  // Filter currencies that have transactions and sort them
  const sortedCurrencies = currencyOrder.filter(currency => revenueByCurrency[currency]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <span className="text-lg text-gray-900">Total Revenue:</span>
        {sortedCurrencies.map((currency, index, array) => (
          <span key={currency} className="text-gray-900">
            {formatAmount(revenueByCurrency[currency], currency)}
            {index < array.length - 1 && <span className="mx-2">|</span>}
          </span>
        ))}
      </div>
    </div>
  );
} 