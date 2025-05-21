export function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100);
}

export function formatDate(utcDate: string): string {
  const date = new Date(utcDate + 'Z'); // Ensure UTC interpretation
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function generateRandomTransaction() {
  const customers = ['John Smith', 'Alice Johnson', 'Bob Wilson', 'Emma Davis', 'Mike Brown'];
  const amounts = [9999, 14950, 29999, 4999, 19999, 7999, 12999, 8999];
  const currencies = ['USD', 'EUR', 'GBP'];

  const customer = customers[Math.floor(Math.random() * customers.length)];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];
  const currency = currencies[Math.floor(Math.random() * currencies.length)];
  const date = new Date().toISOString();

  return {
    customer_name: customer,
    amount,
    currency,
    date
  };
} 