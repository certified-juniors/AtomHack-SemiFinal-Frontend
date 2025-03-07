import { SpaceCard } from '../SpaceCard';

import type { SpaceListProps } from './types';

export const SpaceList = ({ spaces, onEdit, onDelete }: SpaceListProps) => {
    return (
        <div>
            {spaces.map((space) => (
                <SpaceCard key={space.id} {...space} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};
