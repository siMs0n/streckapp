import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}
