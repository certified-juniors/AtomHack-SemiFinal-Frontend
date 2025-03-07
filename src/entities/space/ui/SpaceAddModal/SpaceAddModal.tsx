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
