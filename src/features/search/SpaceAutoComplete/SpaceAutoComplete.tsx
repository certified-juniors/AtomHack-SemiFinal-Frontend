import { Autocomplete, Button, Flex } from '@mantine/core';
import { FaPlus as CreateIcon } from 'react-icons/fa';

export const SpaceAutoComplete = () => {
    return (
        <Flex w="100%" align="flex-end" gap="10px">
            <Autocomplete w="88%" label="Название пространства" placeholder="Поиск" width="100%" />
            <Button leftSection={<CreateIcon />}>Создать</Button>
        </Flex>
    );
};
