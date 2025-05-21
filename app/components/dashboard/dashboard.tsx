'use client';

import { useState, useEffect } from 'react';
import { generateRandomTransaction } from '@/app/lib/utils';
import TotalRevenue from '@/app/components/dashboard/total-revenue';
import Search from '@/app/components/dashboard/search';
import Table from '@/app/components/dashboard/table';
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
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddingRandom, setIsAddingRandom] = useState(false);
  const rowsPerPage = 15;

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const addRandomTransaction = async () => {
    setIsAddingRandom(true);
    try {
      const randomTransaction = generateRandomTransaction();
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(randomTransaction),
      });
      if (!response.ok) throw new Error('Failed to add random transaction');
      await fetchTransactions();
    } catch (error) {
      console.error('Error adding random transaction:', error);
    } finally {
      setIsAddingRandom(false);
    }
  };

  useEffect(() => {
    const evtSource = new EventSource('/api/realtime');

    evtSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_transaction') {
        fetchTransactions();
      }
    };

    return () => {
      evtSource.close();
    };
  }, []);

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
            <div className="flex gap-2">
              <button
                onClick={addRandomTransaction}
                disabled={isAddingRandom}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50"
              >
                {isAddingRandom ? 'Adding...' : 'Add Random'}
              </button>
              <Link
                href="/add"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                Add Transaction
              </Link>
            </div>
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