import { Flex, Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';

import type { SpaceType } from '@/src/entities';
import { getAllSpaces, SpaceList, updateSpaceById } from '@/src/entities';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';
import { Search } from '@/src/widgets';

export const Spaces = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [spaces, setSpaces] = useState<SpaceType[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                const data = await getAllSpaces();

                setSpaces(data);
            } catch (error: unknown) {
                showNotification({ variant: NOTIFICATION_VARIANT.ERROR, message: error as string });
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleDeleteSpace = async (_: number) => {
        try {
            showNotification({
                variant: NOTIFICATION_VARIANT.SUCCESS,
                message: 'Не удалено ;)',
            });
        } catch (error: unknown) {
            showNotification({ variant: NOTIFICATION_VARIANT.ERROR, message: error as string });
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
            showNotification({ variant: NOTIFICATION_VARIANT.ERROR, message: error as string });
        }
    };

    const skeletons = Array(5).fill(null);

    return (
        <Flex direction="column" gap={10} p={20}>
            <Search />

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
