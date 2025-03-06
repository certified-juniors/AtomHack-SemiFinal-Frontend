import type { ReactNode } from 'react';

export enum NOTIFICATION_VARIANT {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    LOADING = 'loading',
    DEFAULT = 'default',
}

export type INotificationParam = {
    color?: string;
    icon?: ReactNode;
    title: string;
};

export type IShowNotificationProps = {
    variant?: NOTIFICATION_VARIANT;
    message?: string;
    isLoading?: boolean;
};
