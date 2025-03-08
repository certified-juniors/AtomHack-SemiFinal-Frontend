import type { ReservoirType } from '@/src/entities';
import type { Node } from '@/src/features';

const SPACING = 300;

export const formatReservoirsToNodes = (reservoirs: ReservoirType[]): Node[] => {
    const columns = Math.ceil(Math.sqrt(reservoirs.length));

    return reservoirs.map((reservoir, index) => {
        const x = (index % columns) * SPACING;
        const y = Math.floor(index / columns) * SPACING;
        return {
            id: reservoir.id.toString(),
            position: { x, y },
            type: 'reservoir',
            data: reservoir,
        };
    });
};
