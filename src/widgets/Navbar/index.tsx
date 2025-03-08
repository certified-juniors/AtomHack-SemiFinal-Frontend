import { ActionIcon, Flex, Modal, TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import { postNewReservoir } from '@/src/entities/reservoir/api';
import { useFlow } from '@/src/features';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

export const Navbar = () => {
    const { id } = useParams();
    const [opened, setOpened] = useState(false);
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false);
    const { dispatch } = useFlow();

    const handleAddReservoir = async () => {
        if (!area || isNaN(Number(area))) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: 'Введите корректную площадь',
            });
            return;
        }

        setLoading(true);
        try {
            const data = await postNewReservoir(Number(id), Number(area));

            showNotification({
                variant: NOTIFICATION_VARIANT.SUCCESS,
                message: 'Резервуар успешно добавлен',
            });

            dispatch({ type: 'ADD_NODE', payload: data });

            setOpened(false);
            setArea('');
        } catch (error) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: error.message as string,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Flex direction="column" align="center" justify="center" gap={10}>
                <ActionIcon radius="xl" size="xl" onClick={() => setOpened(true)}>
                    <IoAddCircleOutline size="xs" />
                </ActionIcon>
            </Flex>

            <Modal opened={opened} onClose={() => setOpened(false)} title="Добавить резервуар">
                <TextInput
                    label="Площадь (м²)"
                    placeholder="Введите площадь"
                    value={area}
                    onChange={(event) => setArea(event.currentTarget.value)}
                />
                <Button fullWidth mt="md" onClick={handleAddReservoir} loading={loading}>
                    Добавить
                </Button>
            </Modal>
        </>
    );
};
