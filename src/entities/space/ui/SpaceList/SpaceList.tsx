import { SpaceCard } from '../SpaceCard';
import { Space } from '../../';
import styles from './SpaceList.module.scss';

interface SpaceListProps {
    spaces: Space[];
    currentSpaceId?: number | string;
    onSelect: (id: number) => void;
    onEdit: (id: number, name: string) => void;
    onDelete: (id: number) => void;
}

export const SpaceList: React.FC<SpaceListProps> = ({
    spaces,
    onSelect,
    onEdit,
    onDelete,
    currentSpaceId,
}) => (
    <div className={styles.spaceList}>
        {spaces.map((space) => (
            <SpaceCard
                key={space.id}
                isSelected={space.id == currentSpaceId}
                space={space}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>
);
