import {ToastContainer as DefaultToastContainer} from 'react-toastify';

import {toastConfig} from './constants';

export * from './constants';

export function ToastContainer() {
  return <DefaultToastContainer {...toastConfig} />;
}

export default ToastContainer;