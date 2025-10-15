import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from '@/+shared/providers/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import router from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="size-full">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
};

export default App;