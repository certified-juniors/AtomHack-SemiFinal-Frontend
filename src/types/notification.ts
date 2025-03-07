import type { ReactNode } from 'react';

import type { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

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
