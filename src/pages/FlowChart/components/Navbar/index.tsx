import { Button, Text } from "@mantine/core";
import styles from "./styles.module.scss";
import { EditSpaceModal, AddSpaceModal } from "./components/SpaceModals";
import { SpaceList } from "./components/SpaceList";
import { ToolsPanel } from "./components/SpaceToolbar";
import { useNavbarState } from "./service";

const Navbar = () => {
  const state = useNavbarState();

  const handleAddSpace = () => {
    state.setSpaces([
      ...state.spaces,
      { id: state.spaces.length + 1, name: state.newSpaceName, tanksCount: 0 },
    ]);
    state.setNewSpaceName("");
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
    state.setEditedSpaceName("");
  };

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.mainNavbar}>
        <div>
          <Text size="xl">Пространства</Text>
          <SpaceList
            spaces={state.spaces}
            onSelect={state.navigate}
            onEdit={state.setEditingSpaceId}
            onDelete={handleDeleteSpace}
          />
          <Button onClick={() => state.setOpened(true)}>
            Добавить пространство
          </Button>
        </div>

        <Button
          className={styles.toolsButton}
          onClick={() => state.setToolsOpen(!state.toolsOpen)}
        >
          Инструменты
        </Button>
      </div>
      
      <ToolsPanel
        toolsOpen={state.toolsOpen}
        toggleTools={() => state.setToolsOpen(!state.toolsOpen)}
      />

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

export { Navbar };
