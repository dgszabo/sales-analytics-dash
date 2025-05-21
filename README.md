# Sales Analytics Dashboard

A real-time sales analytics dashboard built with Next.js, featuring transaction management and real-time updates.

## Setup

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Technical Approach

### Architecture
- **Next.js App Router**: Used for server-side rendering and API routes
- **Server Components**: Leveraged for better performance and SEO
- **Client Components**: Used only where interactivity is needed (dashboard, forms)
- **SQLite**: In-memory database for simplicity and development speed

### Key Decisions & Trade-offs

1. **Database Choice**
   - Used SQLite in-memory for simplicity and development speed
   - Trade-off: Not suitable for production, would need to switch to PostgreSQL/MySQL

2. **Real-time Updates**
   - Implemented Server-Sent Events (SSE) for real-time updates
   - Chose SSE over WebSocket because:
     - Simpler to implement
     - One-way communication is sufficient
     - Better browser support
     - Automatic reconnection

3. **State Management**
   - Used React's built-in state management
   - Trade-off: Could use Zustand/Redux for more complex state needs

4. **Styling**
   - Used Tailwind CSS for rapid development
   - Trade-off: Larger CSS bundle size

5. **No Tests**
   - Considering that this is a quick take-home app, no tests were added
   - But modules were created to make testing easy (like the date and currency formatter modules)

## Assumptions & Limitations

1. **Database**
   - In-memory SQLite database resets on server restart
   - No data persistence between deployments
   - No user authentication/authorization

2. **Real-time Updates**
   - SSE connection might drop in unstable networks
   - No message queuing for offline clients

3. **Currency Handling**
   - Amounts stored as integers (cents)
   - Limited to USD, EUR, GBP currencies (but extendable and decimal places and formatting can be adjusted per currency)
   - No currency conversion

4. **Performance**
   - No pagination on the server side
   - All transactions loaded into memory

## Review Focus Points

1. **Real-time Architecture**
   - Efficient SSE implementation with minimal server load
   - Smart client-side state management during updates
   - Automatic reconnection handling

2. **Currency & Date Handling**
   - Consistent currency formatting across the app
   - Proper timezone handling for dates
   - Integer-based amount storage to avoid floating-point issues

3. **Component Design**
   - Clean separation of server/client components
   - Reusable form components with proper validation
   - Efficient pagination implementation

4. **Performance Considerations**
   - Minimal client-side JavaScript
   - Efficient filtering and sorting
   - Smart use of Server Components

5. **Code Quality**
   - TypeScript for type safety
   - Consistent error handling
   - Clean and maintainable code structure

## Future Improvements

1. **Database**
   - Implement proper database with persistence
   - Add user authentication
   - Add database migrations

2. **Features**
   - Add transaction editing/deletion
   - Implement server-side pagination
   - Add date range filtering

3. **Performance**
   - Implement proper caching
   - Add loading states
   - Optimize bundle size

4. **Testing**
   - Add unit tests
   - Add integration tests
   - Add E2E tests
