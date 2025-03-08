import { Flex } from '@mantine/core';

import { SpaceCard } from '../SpaceCard';

import type { SpaceListProps } from './types';

export const SpaceList = ({ spaces, onEdit, onDelete }: SpaceListProps) => {
    return (
        <Flex direction="column" gap={10}>
            {spaces.map((space) => (
                <SpaceCard key={space.id} {...space} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </Flex>
    );
};
