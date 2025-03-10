import { Button, Modal, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';

import { useFlow } from '@/src/features';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

import { postNewReservoir } from '../../api';

import type { ReservoirAddModalProps } from './types';

export const ReservoirAddModal = ({ opened, close }: ReservoirAddModalProps) => {
    const { id } = useParams();
    const { dispatch } = useFlow();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { area: 20, level: 0 },
        validate: {
            area: (value: number) => (value > 0 ? null : 'Площадь должна быть больше 0'),
        },
    });

    const handleCreateReservoir = async ({ area, level }: { area: number; level: number }) => {
        try {
            const data = await postNewReservoir(Number(id), area, level);

            showNotification({
                variant: NOTIFICATION_VARIANT.SUCCESS,
                message: 'Резервуар успешно добавлен',
            });

            dispatch({
                type: 'ADD_NODE',
                payload: data,
            });

            form.reset();
            close();
        } catch (error) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: (error as Error).message,
            });
        }
    };

    return (
        <Modal opened={opened} onClose={close} title="Создать резервуар">
            <form onSubmit={form.onSubmit(handleCreateReservoir)}>
                <NumberInput
                    label="Площадь (м²)"
                    placeholder="Введите площадь"
                    {...form.getInputProps('area')}
                    min={1}
                    max={50}
                />

                <NumberInput
                    label="Начальный уровень воды (м)"
                    placeholder="Введите уровень воды"
                    {...form.getInputProps('level')}
                    min={0}
                    max={10}
                />
                <Button mt="md" type="submit">
                    Сохранить
                </Button>
            </form>
        </Modal>
    );
};
