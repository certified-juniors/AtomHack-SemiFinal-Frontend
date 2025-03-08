import { Button, Flex, Group, Modal, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SpaceProps } from './types';

export const SpaceCard = ({ id, name, onEdit, onDelete }: SpaceProps) => {
    const [updatedName, setUpdatedName] = useState<string>(name);

    const navigate = useNavigate();

    const [deleteModalOpened, { open: toggleOpenDeleteModal, close: toggleCloseDeleteModal }] =
        useDisclosure();
    const [editModalOpened, { open: toggleOpenEditModal, close: toggleCloseEditModal }] =
        useDisclosure();

    return (
        <Flex
            direction="row"
            justify="space-between"
            align="center"
            onClick={() => navigate(`/space/${id}`)}
            p={10}
            style={{
                cursor: 'pointer',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease-in-out',
            }}
        >
            <Title order={3}>{name}</Title>

            <Button.Group>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleOpenDeleteModal();
                    }}
                    bg="red"
                >
                    Удалить
                </Button>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleOpenEditModal();
                    }}
                >
                    Изменить
                </Button>
            </Button.Group>

            <Modal
                opened={deleteModalOpened}
                onClose={toggleCloseDeleteModal}
                onClick={(e) => e.stopPropagation()}
                title="Удалить пространтсво"
            >
                <Group justify="flex-end">
                    <Button
                        onClick={() => {
                            onDelete(id);
                            toggleCloseDeleteModal();
                        }}
                        bg="red"
                    >
                        Удалить
                    </Button>
                    <Button onClick={toggleCloseDeleteModal}>Отменить</Button>
                </Group>
            </Modal>

            <Modal
                opened={editModalOpened}
                onClose={toggleCloseEditModal}
                onClick={(e) => e.stopPropagation()}
                title="Изменить пространство"
            >
                <TextInput
                    label="Название пространства"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                />

                <Group justify="flex-end" gap="10" mt="md">
                    <Button
                        onClick={() => {
                            onEdit(id, updatedName);
                            toggleCloseEditModal();
                        }}
                    >
                        Изменить
                    </Button>
                    <Button onClick={toggleCloseEditModal}>Отменить</Button>
                </Group>
            </Modal>
        </Flex>
    );
};
