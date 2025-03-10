import { Button, Flex, Group, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { FaPlus as CreateIcon } from 'react-icons/fa';

import type { SearchProps } from './types';

export const Search = ({ onCreate, search, onSearch }: SearchProps) => {
    const [isModalOpened, { open: toggleOpen, close: toggleClose }] = useDisclosure();
    const [name, setName] = useState<string>('');

    return (
        <Flex w="100%" gap="10px" direction="column">
            <TextInput
                w="100%"
                label="Поиск"
                placeholder="Введите название пространства"
                width="100%"
                value={search}
                onChange={(event) => onSearch(event.target.value)}
            />
            <Button variant="light" rightSection={<CreateIcon />} onClick={() => toggleOpen()}>
                Создать пространство
            </Button>

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
                    <Button onClick={toggleClose} variant="outline">
                        Отменить
                    </Button>
                </Group>
            </Modal>
        </Flex>
    );
};
