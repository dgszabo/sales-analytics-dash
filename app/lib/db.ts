import Database from 'better-sqlite3';
import { generateRandomTransaction } from '@/app/lib/utils';

// Types
export interface Transaction {
  id: number;
  date: string;
  customer_name: string;
  amount: number;
  currency: string;
}

// Create in-memory DB
const db = new Database('file:memdb1?mode=memory&cache=shared');

// Create transactions table
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    customer_name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD'
  );
`);

// 2 main methods
export const dbOps = {
  createTransaction: (customerName: string, amount: number, currency: string = 'USD') => {
    const stmt = db.prepare('INSERT INTO transactions (customer_name, amount, currency) VALUES (?, ?, ?)');
    return stmt.run(customerName, amount, currency);
  },

  getAllTransactions: () => {
    return db.prepare('SELECT * FROM transactions ORDER BY date DESC').all();
  }
};

// Clear existing data
db.exec('DELETE FROM transactions');

// Load initial test data
for (let i = 0; i < 100; i++) {
  const { customer_name, amount, currency } = generateRandomTransaction();
  dbOps.createTransaction(customer_name, amount, currency);
}

export default db;
 