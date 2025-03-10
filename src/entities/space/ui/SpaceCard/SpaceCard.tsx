import { ActionIcon, Button, Flex, Group, Modal, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons-react';
import { useState } from 'react';
import { FiChevronsRight as ChevronRightIcon } from 'react-icons/fi';

import type { SpaceProps } from './types';

import './space-card.css';

export const SpaceCard = ({ id, name, onEdit, onClick, className = '' }: SpaceProps) => {
    const [updatedName, setUpdatedName] = useState<string>(name);

    const [editModalOpened, { open: toggleOpenEditModal, close: toggleCloseEditModal }] =
        useDisclosure();

    return (
        <>
            <Flex
                direction="row"
                justify="space-between"
                align="center"
                p={4}
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={onClick}
                className={className}
            >
                <Flex direction="row" align="center" gap={5}>
                    <ActionIcon
                        className="edit-icon"
                        bg="transparent"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleOpenEditModal();
                        }}
                    >
                        <IconPencil size={20} color="transparent" />
                    </ActionIcon>

                    <Text>{name}</Text>
                </Flex>

                <ActionIcon bg="transparent">
                    <ChevronRightIcon size={20} color="var(--mantine-color-blue-light-color)" />
                </ActionIcon>
            </Flex>
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
                    <Button onClick={toggleCloseEditModal} variant="outline">
                        Отменить
                    </Button>
                </Group>
            </Modal>
        </>
    );
};
