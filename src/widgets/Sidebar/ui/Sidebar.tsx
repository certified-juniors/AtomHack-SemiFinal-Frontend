import { Flex, Skeleton } from '@mantine/core';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
    createNewSpace,
    getAllSpaces,
    SpaceList,
    updateSpaceById,
    type SpaceType,
} from '@/src/entities';
import { Search } from '@/src/features';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

export const Sidebar = (props: { onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [spaces, setSpaces] = useState<SpaceType[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultSearch = searchParams.get('name') || '';
    const [search, setSearch] = useState(defaultSearch);
    const [paginationParams, setPaginationParams] = useState({
        totalElements: 0,
        totalPages: 0,
        size: 0,
        currentPage: 0,
    });

    const setPage = (page: number) => {
        setPaginationParams((prev) => ({
            ...prev,
            currentPage: page - 1,
        }));
    };

    const handleDeleteSpace = async (id: number) => {
        try {
            showNotification({
                variant: NOTIFICATION_VARIANT.SUCCESS,
                message: `Не удалено ;) ${id}`,
            });
        } catch (error: unknown) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            });
        }
    };

    const handleUpdateSpace = async (spaceId: number, name: string) => {
        if (!name.trim()) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: 'Название не может быть пустым',
            });
            return;
        }

        try {
            const { name: updatedName } = await updateSpaceById(spaceId, name);

            setSpaces((prev) =>
                prev.map((space) =>
                    space.id === spaceId ? { ...space, name: updatedName } : space
                )
            );

            showNotification({
                variant: NOTIFICATION_VARIANT.SUCCESS,
                message: 'Название обновлено',
            });
        } catch (error: unknown) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            });
        }
    };

    const handleCreateSpace = async (name: string) => {
        if (!name.trim()) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: 'Название не может быть пустым',
            });
            return;
        }

        try {
            setIsLoading(true);
            const data = await createNewSpace(name);
            setSpaces((prev) => [...prev, data]);

            showNotification({
                variant: NOTIFICATION_VARIANT.SUCCESS,
                message: `Пространство ${name} создано`,
            });
        } catch (error: unknown) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSpaces = async (search: string, page: number) => {
        setIsLoading(true);
        try {
            setSearchParams(search ? { query: search } : {});

            const {
                content = [],
                totalElements,
                totalPages,
                size,
            } = await getAllSpaces(search, page);

            setSpaces(content);
            setPaginationParams({
                totalElements,
                totalPages,
                size,
                currentPage: page,
            });
        } catch (error: unknown) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: (error as Error).message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedSearch = useCallback(debounce(fetchSpaces, 500), []);

    useEffect(() => {
        debouncedSearch(search, paginationParams.currentPage);
    }, [search, paginationParams.currentPage]);

    const skeletons = Array(5).fill(null);

    return (
        <Flex direction="column" gap={25} p={20} h={'100%'}>
            <Search
                onCreate={handleCreateSpace}
                search={search}
                onSearch={(value) => setSearch(value)}
            />

            {isLoading ? (
                skeletons.map((_, index) => (
                    <Skeleton key={index} height={80} visible={isLoading} />
                ))
            ) : (
                <SpaceList
                    onClose={props.onClose}
                    pagination={paginationParams}
                    spaces={spaces}
                    onEdit={handleUpdateSpace}
                    onDelete={handleDeleteSpace}
                    setPage={setPage}
                />
            )}
        </Flex>
    );
};
