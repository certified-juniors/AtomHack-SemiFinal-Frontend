import { Modal, Stack, TextInput, Group, Button } from '@mantine/core';

type AddSpaceModalProps = {
    opened: boolean;
    onClose: () => void;
    newSpaceName: string;
    setNewSpaceName: (name: string) => void;
    onAdd: () => void;
};

export const AddSpaceModal: React.FC<AddSpaceModalProps> = ({
    opened,
    onClose,
    newSpaceName,
    setNewSpaceName,
    onAdd,
}) => (
    <Modal opened={opened} onClose={onClose} title="Добавление пространства">
        <Stack>
            <TextInput
                label="Название пространства"
                value={newSpaceName}
                onChange={(e) => setNewSpaceName(e.target.value)}
            />
            <Group justify="flex-end">
                <Button onClick={onAdd}>Добавить</Button>
            </Group>
        </Stack>
    </Modal>
);

type EditSpaceModalProps = {
    editingSpaceId: number | null;
    onClose: () => void;
    editedSpaceName: string;
    setEditedSpaceName: (name: string) => void;
    onEdit: (id: number) => void;
};

export const EditSpaceModal: React.FC<EditSpaceModalProps> = ({
    editingSpaceId,
    onClose,
    editedSpaceName,
    setEditedSpaceName,
    onEdit,
}) =>
    editingSpaceId !== null && (
        <Modal opened={true} onClose={onClose} title="Изменение пространства">
            <Stack>
                <TextInput
                    label="Новое название"
                    value={editedSpaceName}
                    onChange={(e) => setEditedSpaceName(e.target.value)}
                />
                <Group>
                    <Button onClick={() => onEdit(editingSpaceId)}>Сохранить</Button>
                </Group>
            </Stack>
        </Modal>
    );
