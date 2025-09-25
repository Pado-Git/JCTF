import { RouterProvider } from 'react-router-dom';
import { Toaster } from '@/+shared/components/feedback/sonner';
import router from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="size-full">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
};

export default App;