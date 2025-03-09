import type { ReservoirType } from '../../model';

export type ReservoirDeleteModalProps = {
    opened: boolean;
    close: () => void;
    reservoir?: ReservoirType;
};
