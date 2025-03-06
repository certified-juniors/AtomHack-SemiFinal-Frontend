import { Button, Text } from '@mantine/core';

import { EditSpaceModal, AddSpaceModal, SpaceList } from '../../entities/space';

import { useNavbarState } from './hooks';
import styles from './styles.module.scss';
import { ToolsPanel } from './ui/SpaceToolbar';

export const Navbar = () => {
    const state = useNavbarState();

    const handleAddSpace = () => {
        state.setSpaces([
            ...state.spaces,
            {
                id: state.spaces.length + 1,
                name: state.newSpaceName,
                createdAt: new Date().toLocaleDateString(),
            },
        ]);
        state.setNewSpaceName('');
        state.setOpened(false);
    };

    const handleDeleteSpace = (id: number) => {
        state.setSpaces(state.spaces.filter((space) => space.id !== id));
    };

    const handleEditSpace = (id: number) => {
        state.setSpaces(
            state.spaces.map((space) =>
                space.id === id ? { ...space, name: state.editedSpaceName } : space
            )
        );
        state.setEditingSpaceId(null);
        state.setEditedSpaceName('');
    };

    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.mainNavbar}>
                <ToolsPanel
                    toolsOpen={state.toolsOpen}
                    toggleTools={() => state.setToolsOpen(!state.toolsOpen)}
                />
                <Button
                    className={styles.toolsButton}
                    onClick={() => state.setToolsOpen(!state.toolsOpen)}
                >
                    Пространства
                </Button>
            </div>
            <div className={`${styles.secondNavbar} ${state.toolsOpen ? styles.open : ''}`}>
                <Text size="xl">Пространства</Text>
                <SpaceList
                    currentSpaceId={state.id}
                    spaces={state.spaces}
                    onSelect={state.selectSpace}
                    onEdit={state.setEditingSpaceId}
                    onDelete={handleDeleteSpace}
                />
                <Button onClick={() => state.setOpened(true)}>Добавить пространство</Button>
            </div>

            <AddSpaceModal
                {...state}
                onClose={() => state.setOpened(false)}
                onAdd={handleAddSpace}
            />

            <EditSpaceModal
                {...state}
                onClose={() => state.setEditingSpaceId(null)}
                onEdit={handleEditSpace}
            />
        </div>
    );
};
