import { Button, Group, Modal } from '@mantine/core';

import type { ReservoirDeleteModalProps } from './types';

export const ReservoirDeleteModal = ({ opened, close }: ReservoirDeleteModalProps) => {
    return (
        <Modal opened={opened} onClose={close} title="Удалить резервуар">
            <Group>
                <Button bg="red">Удалить</Button>
                <Button>Отменить</Button>
            </Group>
        </Modal>
    );
};
