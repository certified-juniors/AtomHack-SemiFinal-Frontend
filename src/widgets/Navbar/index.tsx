import { Button, Text } from '@mantine/core';
import cn from 'classnames';
import { EditSpaceModal, AddSpaceModal, SpaceList, Space } from '../../entities/space';

import styles from './styles.module.scss';
import { ToolsPanel } from './ui/SpaceToolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const selectSpace = (id: number | string) => {
        navigate(`/space/${id}`);
    };
    const [spaces, setSpaces] = useState<Space[]>([
        { id: 1, name: 'Пространство 1', createdAt: '22.01.2025' },
        { id: 2, name: 'Пространство 2', createdAt: '22.01.2025' },
    ]);
    const [opened, setOpened] = useState(false);
    const [newSpaceName, setNewSpaceName] = useState('');
    const [editedSpaceName, setEditedSpaceName] = useState('');
    const [editingSpaceId, setEditingSpaceId] = useState<number | null>(null);
    const [toolsOpen, setToolsOpen] = useState(false);

    const handleAddSpace = () => {
        setSpaces([
            ...spaces,
            {
                id: spaces.length + 1,
                name: newSpaceName,
                createdAt: new Date().toLocaleDateString(),
            },
        ]);
        setNewSpaceName('');
        setOpened(false);
    };

    const handleDeleteSpace = (id: number) => {
        setSpaces(spaces.filter((space) => space.id !== id));
    };

    const handleEditSpace = (id: number) => {
        setSpaces(
            spaces.map((space) =>
                space.id === id ? { ...space, name: editedSpaceName } : space
            )
        );
        setEditingSpaceId(null);
        setEditedSpaceName('');
    };

    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.mainNavbar}>
                <ToolsPanel
                    toolsOpen={toolsOpen}
                    toggleTools={() => setToolsOpen(!toolsOpen)}
                />
                <Button
                    className={styles.toolsButton}
                    onClick={() => setToolsOpen(!toolsOpen)}
                >
                    Пространства
                </Button>
            </div>
            <div
                className={cn(styles.secondNavbar, toolsOpen && styles.open)}
            >
                <Text size="xl">Пространства</Text>
                <SpaceList
                    currentSpaceId={id}
                    spaces={spaces}
                    onSelect={selectSpace}
                    onEdit={setEditingSpaceId}
                    onDelete={handleDeleteSpace}
                />
                <Button onClick={() => setOpened(true)}>Добавить пространство</Button>
            </div>

            <AddSpaceModal
                opened={opened}
                newSpaceName={newSpaceName}
                setNewSpaceName={setNewSpaceName}
                onClose={() => setOpened(false)}
                onAdd={handleAddSpace}
            />

            <EditSpaceModal
                editedSpaceName={editedSpaceName}
                editingSpaceId={editingSpaceId}
                setEditedSpaceName={setEditedSpaceName}
                onClose={() => setEditingSpaceId(null)}
                onEdit={handleEditSpace}
            />
        </div>
    );
};
