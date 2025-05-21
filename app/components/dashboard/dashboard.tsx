'use client';

import { useState, useEffect } from 'react';
import { formatAmount } from '@/app/lib/utils';
import TotalRevenue from './total-revenue';
import Search from './search';
import Table from './table';
import Link from 'next/link';

interface DashboardProps {
  initialTransactions: Transaction[];
}

interface Transaction {
  id: number;
  date: string;
  customer_name: string;
  amount: number;
  currency: string;
}

export default function Dashboard({ initialTransactions }: DashboardProps) {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredTransactions.length);
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
            <Link
              href="/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Transaction
            </Link>
          </div>
          <TotalRevenue transactions={transactions} />
        </div>
        <div className="mt-8">
          <Search value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className="mt-8">
          <Table 
            transactions={currentTransactions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalTransactions={filteredTransactions.length}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        </div>
      </div>
    </div>
  );
} 