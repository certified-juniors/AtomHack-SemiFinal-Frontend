import { ActionIcon, Button, Flex, Group, Modal, TextInput, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { FaPlus as CreateIcon } from 'react-icons/fa';

import type { SearchProps } from './types';

export const Search = ({ onCreate, search, onSearch }: SearchProps) => {
    const [isModalOpened, { open: toggleOpen, close: toggleClose }] = useDisclosure();
    const [name, setName] = useState<string>('');

    return (
        <Flex w="100%" align="flex-end" gap="10px">
            <TextInput
                w="100%"
                label="Название пространства"
                placeholder="Поиск"
                width="100%"
                value={search}
                onChange={(event) => onSearch(event.target.value)}
            />
            <Tooltip label="Создать" withArrow position="right">
                <ActionIcon onClick={() => toggleOpen()} w={36} h={36}>
                    <CreateIcon />
                </ActionIcon>
            </Tooltip>

            <Modal
                opened={isModalOpened}
                onClose={toggleClose}
                onClick={(e) => e.stopPropagation()}
                title="Создать пространство"
            >
                <TextInput
                    label="Название пространства"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Group justify="flex-end" gap="10" mt="md">
                    <Button
                        onClick={() => {
                            onCreate(name);
                            toggleClose();
                        }}
                    >
                        Создать
                    </Button>
                    <Button onClick={toggleClose}>Отменить</Button>
                </Group>
            </Modal>
        </Flex>
    );
};
