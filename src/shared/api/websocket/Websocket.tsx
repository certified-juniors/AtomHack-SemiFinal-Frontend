import { Client } from '@stomp/stompjs';
import { createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

import type { IStompContext, Props } from './types';

const StompContext = createContext<IStompContext>({ isConnected: false, client: null });

export const useStompSocket = () => {
    return useContext(StompContext);
};

export const StompSocketProvider: React.FC<Props> = ({ endpoint = '', options = {}, children }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const preparedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

        const socket = new SockJS(`${import.meta.env.VITE_SOCKET_ENDPOINT}${preparedEndpoint}`);

        const stompClient: Client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            ...options,
        });

        stompClient.onConnect = () => {
            setIsConnected(true);
        };

        stompClient.onDisconnect = () => {
            setIsConnected(false);
        };

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);

    return (
        <StompContext.Provider value={{ client, isConnected }}>{children}</StompContext.Provider>
    );
};
