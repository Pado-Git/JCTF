// 토큰 자동 갱신 + 인증 헤더

import HttpStatusCodes from 'http-status-codes';
import ky, {KyRequest, KyResponse, Options as KyOptions} from 'ky';

import {useAuthStore} from '@/+shared/stores';

import {apiURL} from './constants';
import {DataResponse, isDataResponse} from '@/+shared/types';

// [beforeRequest] =============================================================
export function createAuthorizationHeaderHook(request: KyRequest) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return;
  request.headers.set('Authorization', `Bearer ${accessToken}`);
}

// [afterResponse] =============================================================
export async function wrapDataResponse(response: KyResponse) {
  const data = await response.clone().json();
  if (!isDataResponse(data)) {
    const {status: resultCode, statusText: resultMessage} = response;
    const wrapped: DataResponse = {
      result: data,
      resultCode,
      resultMessage,
    };
    return new Response(JSON.stringify(wrapped), response);
  }
  return response;
}

export type RefreshResponse = {accessToken: string; refreshToken: string; [key: string]: any};

let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = (() => {
  const envValue = import.meta.env.VITE_MAX_REFRESH_ATTEMPTS;
  if (!envValue || Number.isNaN(+envValue) || +envValue < 1) {
    return 1;
  }
  return +envValue;
})();

export async function createAfterResponseHook(
  request: KyRequest,
  options: KyOptions,
  response: KyResponse,
) {
  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    useAuthStore.setState({accessToken: null, isLoggedIn: false});
  }
  async function handleUnauthorized(request: KyRequest, options: KyOptions, response: KyResponse) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken || refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      refreshAttempts = 0;
      handleLogout();
      return wrapDataResponse(response);
    }
    refreshAttempts++;
    try {
      const refreshRes = await ky.post<RefreshResponse>('auth/refresh', {
        json: {refresh_token: refreshToken},
        prefixUrl: apiURL,
      });
      const newRefreshData = await refreshRes.json();
      if (newRefreshData) {
        localStorage.setItem('accessToken', newRefreshData.accessToken);
        localStorage.setItem('refreshToken', newRefreshData.refreshToken);
        useAuthStore.setState({accessToken: newRefreshData.accessToken, isLoggedIn: true});
        const retryOptions: KyOptions = {
          ...options,
          headers: {
            ...(typeof options.headers === 'object' ? options.headers : {}),
            Authorization: `Bearer ${newRefreshData.accessToken}`,
          },
        };
        return ky(request, retryOptions);
      }
    } catch (e) {
      console.error('Token refresh failed:', e);
    }
    handleLogout();
    return wrapDataResponse(response);
  }
  // --
  if (response.status === HttpStatusCodes.UNAUTHORIZED) {
    return handleUnauthorized(request, options, response);
  }
  return wrapDataResponse(response);
}
