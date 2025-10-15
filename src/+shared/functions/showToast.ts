import {toast} from 'react-toastify';

export const showToast = (message: string, type: 'active' | 'error') => {
  if (type === 'active') {
    toast.success(message, {
      style: {
        backgroundColor: '#1E1B4B', // state.info
      },
    });
  } else if (type === 'error') {
    toast.error(message, {
      style: {
        backgroundColor: '#570000', // state.error
      },
    });
  }
};

export default showToast;
