import { RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/feedback/sonner';
import router from './Routes';

export default function App() {
  return (
    <div className="size-full">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}