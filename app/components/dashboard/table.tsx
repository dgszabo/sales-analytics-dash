'use client';

import { formatAmount, formatDate } from '@/app/lib/utils';

interface Transaction {
  id: number;
  date: string;
  customer_name: string;
  amount: number;
  currency: string;
}

interface TableProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalTransactions: number;
  startIndex: number;
  endIndex: number;
}

export default function Table({ 
  transactions, 
  currentPage, 
  totalPages, 
  onPageChange,
  totalTransactions,
  startIndex,
  endIndex 
}: TableProps) {
  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {transaction.customer_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {formatAmount(transaction.amount, transaction.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-gray-900">
        <div className="text-sm text-gray-700">
          {totalTransactions === 0 
            ? 'Showing 0 transactions'
            : `Showing ${startIndex + 1} to ${endIndex} of ${totalTransactions} transactions`
          }
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded disabled:opacity-50 bg-white text-gray-900 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded disabled:opacity-50 bg-white text-gray-900 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
} 