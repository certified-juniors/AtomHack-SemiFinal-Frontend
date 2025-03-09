import { Flex, Pagination } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { SpaceCard } from '../SpaceCard';

import type { SpaceListProps } from './types';

export const SpaceList = ({
    spaces,
    pagination,
    onEdit,
    onDelete,
    setPage,
    onClose,
}: SpaceListProps) => {
    const { totalPages, currentPage } = pagination;
    const navigate = useNavigate();

    const handleChooseSpace = (id: number) => {
        onClose();
        navigate(`/space/${id}`);
    };

    return (
        <Flex direction="column" gap={10} justify="space-between" h="80vh">
            <Flex direction="column" gap={10}>
                {spaces.map((space) => (
                    <SpaceCard
                        key={space.id}
                        {...space}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onClick={() => handleChooseSpace(space.id)}
                    />
                ))}
            </Flex>

            <Pagination value={currentPage + 1} total={totalPages} onChange={setPage} />
        </Flex>
    );
};
