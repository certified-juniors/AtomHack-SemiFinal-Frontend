import { Group, ActionIcon, Text } from "@mantine/core";
import { Space } from "../service";
import styles from "../styles.module.scss";

interface SpaceListProps {
  spaces: Space[];
  onSelect: (id: number) => void;
  onEdit: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

export const SpaceList: React.FC<SpaceListProps> = ({
  spaces,
  onSelect,
  onEdit,
  onDelete,
}) => (
  <div className={styles.spaceList}>
    {spaces.map((space) => (
      <SpaceCard
        key={space.id}
        space={space}
        onSelect={onSelect}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);

interface SpaceCardProps {
  space: Space;
  onSelect: (id: number) => void;
  onEdit: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({
  space,
  onSelect,
  onEdit,
  onDelete,
}) => (
  <div className={styles.card} onClick={() => onSelect(space.id)}>
    <div>
      <Text size="lg">{space.name}</Text>
      <Text size="md">Количество резервуаров: {space.tanksCount}</Text>
    </div>
    <Group justify="flex-end">
      <ActionIcon
        onClick={(e) => {
          e.stopPropagation();
          onEdit(space.id, space.name);
        }}
      />
      <ActionIcon
        onClick={(e) => {
          e.stopPropagation();
          onDelete(space.id);
        }}
      />
    </Group>
  </div>
);
