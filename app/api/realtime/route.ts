import { NextResponse } from 'next/server';
import { dbOps } from '@/app/lib/db';

let lastTransactionCount = 0;

export async function GET(req: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Initial send
      lastTransactionCount = dbOps.getAllTransactions().length;
      send({ type: 'init', count: lastTransactionCount });

      // Check for changes every 5 seconds
      const interval = setInterval(() => {
        const currentCount = dbOps.getAllTransactions().length;
        if (currentCount !== lastTransactionCount) {
          lastTransactionCount = currentCount;
          send({ type: 'new_transaction', count: currentCount });
        }
      }, 5000);

      // Cleanup
      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
} 