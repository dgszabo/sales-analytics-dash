'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TransactionFormProps {
  onSubmit: (data: {
    customer_name: string;
    amount: number;
    currency: string;
    date: string;
  }) => Promise<void>;
}

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer_name: '',
    amount: '',
    currency: 'USD'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        amount: Math.round(parseFloat(formData.amount) * 100), // Convert to cents
        date: new Date().toISOString(),
      });
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Failed to create transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customer_name" className="block text-sm font-medium text-gray-900 mb-1">
          Customer Name
        </label>
        <input
          type="text"
          id="customer_name"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Enter customer name"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-900 mb-1">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label htmlFor="currency" className="block text-sm font-medium text-gray-900 mb-1">
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? 'Creating...' : 'Create Transaction'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
} 