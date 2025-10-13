// API URL 설정

const isProd = import.meta.env.MODE === 'production';
export const apiURL = isProd ? import.meta.env.VITE_API_URL : import.meta.env.VITE_DEV_API_URL;
