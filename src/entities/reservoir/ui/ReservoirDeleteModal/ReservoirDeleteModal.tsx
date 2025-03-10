import { Button, Group, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { useFlow } from '@/src/features';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

import { deleteReservoirById } from '../../api';

import type { ReservoirDeleteModalProps } from './types';

export const ReservoirDeleteModal = ({ opened, close, reservoirId }: ReservoirDeleteModalProps) => {
    const { dispatch } = useFlow();

    const handleDelete = () => {
        const numericId = Number(reservoirId);
        if (isNaN(numericId)) return;

        const response = deleteReservoirById(numericId);
        showNotification({
            variant: NOTIFICATION_VARIANT.SUCCESS,
            message: response,
        });

        dispatch({ type: 'REMOVE_NODE', payload: reservoirId ? reservoirId : '' });
        close();
    };

    return (
        <Modal opened={opened} onClose={close} title="Удалить резервуар">
            <Group>
                <Button bg="red" onClick={handleDelete}>
                    Удалить
                </Button>
                <Button onClick={close}>Отменить</Button>
            </Group>
        </Modal>
    );
};
