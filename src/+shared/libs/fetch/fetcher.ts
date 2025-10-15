import {api} from './instances';
import {DataResponse} from '@/+shared/types';

/**
 * API 호출 파라미터
 */
export interface FetcherParams {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: unknown;
  query?: Record<string, any>;
  path?: Record<string, string | number>;
  config?: RequestInit;
  removePrefixes?: string[];
}

/**
 * 타입 안전한 API 호출 함수
 * 
 * @example
 * ```ts
 * const result = await fetcher({
 *   url: '/api/users',
 *   method: 'get',
 *   query: { page: 1 }
 * });
 * ```
 */
export async function fetcher<TResponse = unknown>({
  url,
  method,
  body,
  query,
  path,
  config,
  removePrefixes = ['/api'],
}: FetcherParams): Promise<DataResponse<TResponse>> {
  let finalUrl = url;

  // prefix 제거
  if (removePrefixes.length > 0) {
    for (const prefix of removePrefixes) {
      if (finalUrl.startsWith(prefix)) {
        finalUrl = finalUrl.substring(prefix.length);
        break;
      }
    }
  }
  finalUrl = finalUrl.replace(/^\//, '');

  // path 파라미터 치환 (예: /users/{id} -> /users/123)
  if (path) {
    finalUrl = finalUrl.replace(/\{(\w+)\}/g, (match, key) => String(path[key] ?? match));
  }

  // query 파라미터 생성
  let searchParams: string | undefined = undefined;
  if (query) {
    const filteredQuery = Object.entries(query)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {});
    
    if (Object.keys(filteredQuery).length > 0) {
      searchParams = new URLSearchParams(filteredQuery as Record<string, string>).toString();
    }
  }

  // API 호출
  const response = await api(finalUrl, {
    method,
    ...(body ? {json: body} : {}),
    ...(searchParams ? {searchParams} : {}),
    ...config,
  });

  return await response.json();
}

/**
 * 성공 응답인지 확인
 */
export function isSuccessResponse<T>(
  res: DataResponse<T>,
): boolean {
  return res.resultCode >= 200 && res.resultCode < 300;
}

/**
 * 에러 응답인지 확인
 */
export function isErrorResponse<T>(
  res: DataResponse<T>,
): boolean {
  return res.resultCode >= 400;
}
