import { ActionIcon, Button, Flex, Group, Modal, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { FiChevronsRight as ChevronRightIcon } from 'react-icons/fi';

import type { SpaceProps } from './types';

export const SpaceCard = ({ id, name, onEdit, onClick }: SpaceProps) => {
    const [updatedName, setUpdatedName] = useState<string>(name);

    const [editModalOpened, { close: toggleCloseEditModal }] = useDisclosure();

    return (
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
        >
            <Text>{name}</Text>

            <ActionIcon bg="transparent">
                <ChevronRightIcon size={20} />
            </ActionIcon>

            {/* <Button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleOpenEditModal();
                }}
            >
                Изменить
            </Button> */}

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
