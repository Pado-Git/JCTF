import {DataResponse, dataResponseKeys} from './response';

export function isDataResponse<T>(aData: unknown): aData is DataResponse<T> {
  if (!aData || typeof aData !== 'object' || Array.isArray(aData)) return false;
  const data = aData as DataResponse<T>;
  const keys = Object.keys(aData);
  return keys.every((k) => {
    const key = k as (typeof dataResponseKeys)[number];
    const value = data?.[key];
    if (key === 'resultCode' && typeof value !== 'number') return false;
    if (key === 'resultMessage' && value && typeof value !== 'string') return false;
    return dataResponseKeys.includes(key);
  });
}