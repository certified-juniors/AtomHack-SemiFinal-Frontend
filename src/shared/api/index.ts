import { showNotification } from '@mantine/notifications';
import type { AxiosError } from 'axios';
import axios from 'axios';

import { NOTIFICATION_VARIANT } from '../lib/notifications/types';

const API_URL: string = import.meta.env.VITE_MAIN_ENDPOINT as string;

type ApiErrorType = {
    status: number;
    message?: string;
    timestamp: string;
    errors: {
        fieldName: string | null;
        errorMessage: string;
    }[];
};

export const apiInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
});

// комментим на случай если успеем подвязать авторизацию

// const refreshTokens = async (refresh: string) => {
//     const { data, status } = await apiInstance.post('/auth/refresh', { refresh });
//     if (status === 500) {
//         throw new Error('Internal server error');
//     }
//     return data;
// };

// apiInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('ACCESS_TOKEN');
//
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorType>) => {
        // const originalRequest = error.config;

        if (!error.response) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: 'Ошибка сети или сервер не доступен.',
            });
            window.location.pathname = '/internal-server-error';
            return Promise.reject(error);
        }

        // if (error.response.status === 401 && error.config && !error.config._isRetry) {
        //     originalRequest._isRetry = true;
        //
        //     try {
        //         const { refresh, access } = await refreshTokens(
        //             localStorage.getItem('REFRESH_TOKEN') || ''
        //         );
        //
        //         localStorage.setItem('ACCESS_TOKEN', access);
        //         localStorage.setItem('REFRESH_TOKEN', refresh);
        //         originalRequest.headers.Authorization = `Bearer ${access}`;
        //
        //         return apiInstance(originalRequest);
        //     } catch (error) {
        //         window.location.pathname = '/login';
        //
        //         return Promise.reject(error);
        //     }
        // }

        // if (error.response.status === 403) {
        //     window.location.pathname = '/';
        // }

        if (error.response.status === 503) {
            return Promise.reject(error);
        }

        showNotification({
            variant: NOTIFICATION_VARIANT.ERROR,
            message: error.response.data.message ?? 'Непредвиденная ошибка',
        });

        return Promise.reject(error);
    }
);
