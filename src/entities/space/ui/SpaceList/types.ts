import type { SpaceType } from '../../model';

export type SpaceListProps = {
    spaces: SpaceType[];
    onEdit: (id: number, name: string) => void;
    onDelete: (id: number) => void;
};
