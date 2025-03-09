import { Modal, NumberInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

import { useFlow } from '@/src/features';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

import { updateReservoirById } from '../../api';

import type { ReservoirEditModalProps } from './types';

export const ReservoirEditModal = ({ opened, close, reservoir }: ReservoirEditModalProps) => {
    const { dispatch } = useFlow();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { area: reservoir?.area || 0 },
        validate: {
            area: (value: number) => (value > 0 ? null : 'Площадь должна быть больше 0'),
        },
    });

    useEffect(() => {
        if (reservoir) {
            form.setValues({ area: reservoir.area });
        }
    }, [reservoir]);

    const handleUpdateReservoir = async ({ area }: { area: number }) => {
        try {
            const id = Number(reservoir?.id);

            if (isNaN(id)) {
                throw new Error('Ошибка при обновлении резервуара');
            }

            const data = await updateReservoirById(id, area);

            showNotification({
                variant: NOTIFICATION_VARIANT.SUCCESS,
                message: 'Резервуар успешно обновлен',
            });

            dispatch({
                type: 'UPDATE_DATA',
                payload: data,
            });

            form.reset();
        } catch (error) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: (error as Error).message,
            });
        }
    };

    return (
        <Modal opened={opened} onClose={close} title="Редактировать резервуар">
            <form onSubmit={form.onSubmit(handleUpdateReservoir)}>
                <NumberInput
                    label="Площадь (м²)"
                    placeholder="Введите площадь"
                    {...form.getInputProps('area')}
                />
                <Button mt="md" type="submit">
                    Сохранить
                </Button>
            </form>
        </Modal>
    );
};
