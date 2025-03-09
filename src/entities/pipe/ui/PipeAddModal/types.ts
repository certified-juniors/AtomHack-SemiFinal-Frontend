import type { Connection } from '@xyflow/react';

export type PipeAddModalProps = {
    opened: boolean;
    pendingConnection: Connection | null;
    setPendingConnection: (value: React.SetStateAction<Connection | null>) => void;
    close: () => void;
};
