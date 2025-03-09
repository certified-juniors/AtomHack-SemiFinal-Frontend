import { Button, Modal, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { Edge } from '@xyflow/react';
import { addEdge } from '@xyflow/react';

import { useFlow } from '@/src/features';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

import { createNewPipe } from '../../api';

import type { PipeAddModalProps } from './types';

export const PipeAddModal = ({
    opened,
    pendingConnection,
    close,
    setPendingConnection,
}: PipeAddModalProps) => {
    const { dispatch, state } = useFlow();

    const form = useForm({
        initialValues: { diameter: 0 },
        validate: {
            diameter: (value: number) => (value > 0 ? null : 'Диаметр должен быть больше нуля'),
        },
    });

    const handleConfirmConnection = async () => {
        if (!pendingConnection) return;

        const { hasErrors } = form.validate();
        if (hasErrors) return;

        try {
            const { source, target } = pendingConnection;

            const data = await createNewPipe(form.values.diameter, Number(source), Number(target));

            const edge: Edge = {
                ...pendingConnection,
                type: 'pipe',
                id: String(data.id),
                data: { diameter: data.diameter },
            };

            dispatch({
                type: 'ADD_EDGE',
                payload: addEdge(edge, state.edges),
            });
        } catch (error) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: (error as Error).message,
            });
        }

        close();
        setPendingConnection(null);
        form.reset();
    };

    return (
        <Modal opened={opened} onClose={close} title="Создать трубу">
            <form onSubmit={form.onSubmit(handleConfirmConnection)}>
                <NumberInput
                    label="Диаметр трубы (м)"
                    {...form.getInputProps('diameter')}
                    min={0.01}
                    max={5}
                />
                <Button fullWidth mt="md" type="submit">
                    Создать
                </Button>
            </form>
        </Modal>
    );
};
