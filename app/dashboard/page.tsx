import { Suspense } from 'react';
import Dashboard from '@/app/components/dashboard/dashboard';
import DashboardSkeleton from '@/app/components/dashboard/dashboard-skeleton';

async function getTransactions() {
  const res = await fetch('http://localhost:3000/api/transactions', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return res.json();
}

async function DashboardWithData() {
  const transactions = await getTransactions();
  return <Dashboard initialTransactions={transactions} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardWithData />
    </Suspense>
  );
} 