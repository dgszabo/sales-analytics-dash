'use client';

import TransactionForm from './transaction-form';

export default function AddTransaction() {
  const handleSubmit = async (data: {
    customer_name: string;
    amount: number;
    currency: string;
    date: string;
  }) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Add New Transaction</h1>
          <TransactionForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
} 