import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';

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
