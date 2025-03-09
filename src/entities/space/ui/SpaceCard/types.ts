import type { SpaceType } from '../../model';

export type SpaceProps = SpaceType & {
    onEdit: (id: number, name: string) => void;
    onDelete: (id: number) => void;
};
