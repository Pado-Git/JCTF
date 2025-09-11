import {Outlet} from 'react-router';
import {Footer} from '@/+shared/components';

export function RootLayout() {
  return (
    <>
        <main >
          <Outlet />
        </main>
        <Footer />
    </>
  );
}

export default RootLayout;