/* eslint-disable @typescript-eslint/no-explicit-any */
// axiosInstance.ts
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { CONFIG } from '@/configuration/config';
import { CookieStorage } from '@/utils/browserStorage.util';
import { SnackbarUtils } from '@/utils/snackbar.utils';

const api: AxiosInstance = axios.create({
  baseURL: CONFIG.API_BASE_URL || 'https://localhost:8080/api/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const u_auth = CookieStorage.get('u_auth');
    if (u_auth && config.headers) {
      config.headers.Authorization = `Bearer ${u_auth}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    let message = 'Something went wrong';

    if (error.response) {
      const status = error.response.status;
      message = (error.response.data as any)?.message || `[${status}] ${error.response.statusText}`;

      SnackbarUtils.error(message);
    } else if (error.request) {
      SnackbarUtils.error('No response from server');
    } else {
      SnackbarUtils.error(error.message);
    }

    return Promise.reject(error);
  },
);

export const get = <T>(url: string, config?: AxiosRequestConfig) => api.get<T>(url, config);
export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  api.post<T>(url, data, config);
export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  api.put<T>(url, data, config);
export const del = <T>(url: string, config?: AxiosRequestConfig) => api.delete<T>(url, config);

export default api;
