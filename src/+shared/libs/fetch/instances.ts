import ky, {Options as KyOptions} from 'ky';

import {apiURL} from './constants';
import {createAfterResponseHook, createAuthorizationHeaderHook} from './interceptors';

export function createApiInstance(options?: KyOptions) {
  const instance = ky.create({
    prefixUrl: apiURL,
    timeout: 30000,
    hooks: {
      beforeRequest: [createAuthorizationHeaderHook],
      afterResponse: [createAfterResponseHook],
    },
    ...(options ?? {}),
  });

  return instance;
}

// API 인스턴스 생성
export const api = createApiInstance();