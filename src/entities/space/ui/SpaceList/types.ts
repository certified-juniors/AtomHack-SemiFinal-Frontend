import type { SpaceType } from '../../model';

export type SpaceListProps = {
    spaces: SpaceType[];
    onEdit: (id: number, name: string) => void;
    onDelete: (id: number) => void;
    setPage: (page: number) => void;
    pagination: {
        totalElements: number;
        totalPages: number;
        size: number;
        currentPage: number;
    };
    onClose: () => void;
};
