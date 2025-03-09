import type { PipeType } from '@/src/entities';
import type { Edge } from '@/src/features';

export const formatPipesToEdges = (pipes: PipeType[]): Edge[] =>
    pipes.map(({ id, sourceId, targetId }) => ({
        id: String(id),
        source: String(sourceId),
        target: String(targetId),
        type: 'pipe',
    }));
