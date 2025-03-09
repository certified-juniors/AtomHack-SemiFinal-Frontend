import { ActionIcon, Flex, Tooltip, Divider } from '@mantine/core';
import {
    FaPlus as AddIcon,
    FaRegEdit as EditIcon,
    FaInfo as InfoIcon,
    FaTrashAlt as RemoveIcon,
} from 'react-icons/fa';

import { useFlow } from '@/src/features';

import type { NavbarProps } from './types';

export const Navbar = ({
    toggleInfoModal,
    toggleEditModal,
    toggleCreateModal,
    toggleDeleteModal,
}: NavbarProps) => {
    const {
        state: { selectedNode },
    } = useFlow();

    return (
        <Flex direction="column" align="center" gap={10} h="100%">
            <Tooltip label="Добавить резервуар" position="left">
                <ActionIcon radius="xl" size="36px" onClick={toggleCreateModal}>
                    <AddIcon />
                </ActionIcon>
            </Tooltip>

            <Divider w="100%" color="black" />

            {selectedNode && (
                <>
                    <Tooltip label="Информация о резервуаре" position="left">
                        <ActionIcon radius="xl" size="36px" onClick={toggleInfoModal}>
                            <InfoIcon />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Редактировать резервуар" position="left">
                        <ActionIcon radius="xl" size="36px" onClick={toggleEditModal}>
                            <EditIcon />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Удалить резервуар" position="left">
                        <ActionIcon radius="xl" size="36px" bg="red" onClick={toggleDeleteModal}>
                            <RemoveIcon />
                        </ActionIcon>
                    </Tooltip>
                </>
            )}
        </Flex>
    );
};
