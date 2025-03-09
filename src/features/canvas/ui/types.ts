import type { Connection } from '@xyflow/react';

export type FlowCanvasProps = {
    connectPipes: (connection: Connection) => void;
};
