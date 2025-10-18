import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from '@/+shared/providers/ToastContainer';
import { useWebSocket } from '@/+shared/hooks';
import 'react-toastify/dist/ReactToastify.css';
import router from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

function AppContent() {
  useWebSocket();
  
  return (
    <div className="size-full">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;