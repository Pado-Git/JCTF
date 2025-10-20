import {Slide, ToastContainerProps} from 'react-toastify';

export const toastConfig: ToastContainerProps = {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
  transition: Slide,
} as const;
