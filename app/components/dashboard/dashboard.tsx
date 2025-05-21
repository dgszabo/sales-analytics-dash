'use client';

import { useState } from 'react';
import TotalRevenue from './total-revenue';
import Search from './search';
import Table from './table';

interface Transaction {
  id: number;
  date: string;
  customer_name: string;
  amount: number;
  currency: string;
}

interface DashboardProps {
  initialTransactions: Transaction[];
}

export default function Dashboard({ initialTransactions }: DashboardProps) {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(t => 
    t.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Sales Dashboard</h1>
          <TotalRevenue transactions={transactions} />
        </div>

        <div className="mb-4">
          <Search value={searchTerm} onChange={setSearchTerm} />
        </div>

        <Table 
          transactions={currentTransactions}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
} 