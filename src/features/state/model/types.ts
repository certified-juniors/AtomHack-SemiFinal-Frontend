import type { ReservoirType } from '@/src/entities';

export type Node = {
    id: string;
    position: { x: number; y: number };
    type: string;
    data: ReservoirType;
};

export type Edge = {
    id: string;
    source: string;
    target: string;
};
