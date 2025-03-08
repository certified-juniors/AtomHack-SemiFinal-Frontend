import { Flex, Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { SpaceType } from '@/src/entities';
import { createNewSpace, getAllSpaces, SpaceList, updateSpaceById } from '@/src/entities';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';
import { Search } from '@/src/widgets';

export const Spaces = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [spaces, setSpaces] = useState<SpaceType[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultSearch = searchParams.get('name') || '';
    const [search, setSearch] = useState(defaultSearch);
    const [currentSearch, setCurrentSearch] = useState(defaultSearch);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleSearchSpace(search);
    }, [search]);

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

    const handleSearchSpace = (search: string) => {
        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(async () => {
            try {
                setIsLoading(true);
                setSearchParams(search ? { name: search } : {});
                const data = await getAllSpaces(search);
                setSpaces(data);
            } catch (error: unknown) {
                showNotification({
                    variant: NOTIFICATION_VARIANT.ERROR,
                    message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                });
            } finally {
                setIsLoading(false);
            }
        }, 500);

        setTimer(newTimer);
        setCurrentSearch(search);
    };

    const skeletons = Array(5).fill(null);

    return (
        <Flex direction="column" gap={10} p={20}>
            <Search
                onCreate={handleCreateSpace}
                spacesNames={[...new Set(spaces.map((space) => space.name))]}
                search={search}
                onSearch={(value) => {
                    setSearch(value);
                    handleSearchSpace(value);
                }}
            />

            {isLoading ? (
                skeletons.map((_, index) => (
                    <Skeleton key={index} height={80} visible={isLoading}>
                        <div style={{ height: '80px' }} />
                    </Skeleton>
                ))
            ) : (
                <SpaceList
                    spaces={spaces}
                    onEdit={handleUpdateSpace}
                    onDelete={handleDeleteSpace}
                />
            )}
        </Flex>
    );
};
