import { Flex, Pagination } from '@mantine/core';

import { SpaceCard } from '../SpaceCard';

import type { SpaceListProps } from './types';

export const SpaceList = ({ spaces, pagination, onEdit, onDelete, setPage }: SpaceListProps) => {
    const { totalPages, currentPage } = pagination;

    return (
        <Flex direction="column" gap={10} justify="space-between" h="80vh">
            <Flex direction="column" gap={10}>
                {spaces.map((space) => (
                    <SpaceCard key={space.id} {...space} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </Flex>

            <Pagination value={currentPage + 1} total={totalPages} onChange={setPage} />
        </Flex>
    );
};
