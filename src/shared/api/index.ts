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
    },
});

apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorType>) => {
        if (error.response?.status === 503) {
            return Promise.reject(error);
        }

        showNotification({
            variant: NOTIFICATION_VARIANT.ERROR,
            message: error.response?.data.message ?? 'Непредвиденная ошибка',
        });

        return Promise.reject(error);
    }
);
