import {StatusCodes} from 'http-status-codes';
import {Options} from 'ky';

export const statusResponseKeys = ['resultCode', 'resultMessage'] as const;
export interface StatusResponse {
  resultCode: StatusCodes;
  resultMessage?: string;
}

export const dataResponseKeys = [...statusResponseKeys, 'result'] as const;
export interface DataResponse<T = unknown> extends StatusResponse {
  result: T;
}

export type ApiFunction<T> = () => Promise<DataResponse<T>>;

export type KyHeaders = Options['headers'];
