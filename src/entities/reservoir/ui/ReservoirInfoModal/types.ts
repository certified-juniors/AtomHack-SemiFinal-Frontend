import type { ReservoirType } from '../../model';

export type ReservoirInfoModalProps = {
    opened: boolean;
    close: () => void;
    reservoir?: ReservoirType;
};
