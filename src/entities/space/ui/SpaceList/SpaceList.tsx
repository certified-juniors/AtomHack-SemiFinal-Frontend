import { Flex, Pagination } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    const location = useLocation();

    const [currentId, setCurrentId] = useState<string | null>(null);

    useEffect(() => {
        const newId = location.pathname.split('/')[2];
        setCurrentId(newId);
    }, [location]);

    const handleChooseSpace = (id: number) => {
        onClose();
        navigate(`/space/${id}`);
    };

    return (
        <Flex direction="column" gap={10} justify="space-between" h="80vh">
            <Flex direction="column" gap={10}>
                {spaces.map((space) => (
                    <SpaceCard
                        className={Number(currentId) === space.id ? 'active' : 'default'}
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
