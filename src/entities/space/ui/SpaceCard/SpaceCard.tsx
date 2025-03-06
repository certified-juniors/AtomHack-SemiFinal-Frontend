import { Group, ActionIcon, Text } from '@mantine/core';
import { Space } from '../../model';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import styles from './SpaceCard.module.scss';

interface SpaceCardProps {
    space: Space;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onEdit: (id: number, name: string) => void;
    onDelete: (id: number) => void;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({
    space,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
}) => (
    <div
        className={isSelected ? styles.selectedCard : styles.card}
        onClick={() => {
            onSelect(space.id);
        }}
    >
        <div>
            <Text size="lg">{space.name}</Text>
            <Text size="md">Количество резервуаров: {space.tanksCount}</Text>
        </div>
        <Group justify="flex-end">
            <ActionIcon
                variant="filled"
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(space.id, space.name);
                }}
            >
                <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
                variant="filled"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(space.id);
                }}
            >
                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
        </Group>
    </div>
);
