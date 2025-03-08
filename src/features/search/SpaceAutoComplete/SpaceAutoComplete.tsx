import { Autocomplete, Button, Flex, Group, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { FaPlus as CreateIcon } from 'react-icons/fa';

type SpaceAutoCompleteProps = {
    onCreate: (name: string) => void;
    search: string;
    onSearch: (search: string) => void;
    spacesNames: string[];
};

export const SpaceAutoComplete = ({
    onCreate,
    spacesNames,
    search,
    onSearch,
}: SpaceAutoCompleteProps) => {
    const [isModalOpened, { open: toggleOpen, close: toggleClose }] = useDisclosure();
    const [name, setName] = useState<string>('');

    return (
        <Flex w="100%" align="flex-end" gap="10px">
            <Autocomplete
                w="88%"
                label="Название пространства"
                placeholder="Поиск"
                width="100%"
                data={spacesNames}
                value={search}
                onChange={(value) => onSearch(value)}
            />
            <Button leftSection={<CreateIcon />} onClick={() => toggleOpen()}>
                Создать
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
                    <Button onClick={toggleClose}>Отменить</Button>
                </Group>
            </Modal>
        </Flex>
    );
};
