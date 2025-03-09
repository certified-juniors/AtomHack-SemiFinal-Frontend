import type { ReservoirType } from '../../model';

export type ReservoirEditModalProps = {
    opened: boolean;
    close: () => void;
    reservoir?: ReservoirType;
};
