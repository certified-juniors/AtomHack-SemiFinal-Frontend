import type { Client } from '@stomp/stompjs';
import type { ReactNode } from 'react';

export type Props = {
    children: ReactNode;
    options?: Record<string, unknown>;
    endpoint?: string;
};

export type IStompContext = {
    client: Client | null;
    isConnected: boolean;
};
