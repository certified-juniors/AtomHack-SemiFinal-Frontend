import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { Connection } from '@xyflow/react';
import { useCallback, useState } from 'react';

import {
    PipeAddModal,
    ReservoirAddModal,
    ReservoirDeleteModal,
    ReservoirEditModal,
    ReservoirInfoModal,
} from '@/src/entities';
import { FlowCanvas, useFlow } from '@/src/features';
import { Navbar } from '@/src/widgets';

export const FlowChart = () => {
    const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);

    const [addModalOpened, { toggle: toggleAddModal, close: closeAddModal }] = useDisclosure();
    const [infoModalOpened, { toggle: toggleInfoModal, close: closeInfoModal }] = useDisclosure();
    const [editModalOpened, { toggle: toggleEditModal, close: closeEditModal }] = useDisclosure();
    const [deleteModalOpened, { toggle: toggleDeleteModal, close: closeDeleteModal }] =
        useDisclosure();

    const [addPipeModalOpened, { open: openAddPipeModal, close: closeAddPipeModal }] =
        useDisclosure();

    const {
        state: { selectedNode, nodes },
    } = useFlow();

    const handleConnectPipes = useCallback(
        (connection: Connection) => {
            setPendingConnection(connection);
            openAddPipeModal();
        },
        [openAddPipeModal]
    );

    const reservoir = nodes.find((node) => node.id === String(selectedNode));

    return (
        <>
            <FlowCanvas connectPipes={handleConnectPipes} />
            <AppShell.Aside p="md">
                <Navbar
                    toggleCreateModal={toggleAddModal}
                    toggleInfoModal={toggleInfoModal}
                    toggleEditModal={toggleEditModal}
                    toggleDeleteModal={toggleDeleteModal}
                />
            </AppShell.Aside>

            <ReservoirAddModal opened={addModalOpened} close={closeAddModal} />

            <ReservoirInfoModal
                opened={infoModalOpened}
                close={closeInfoModal}
                reservoir={reservoir?.data}
            />

            <ReservoirEditModal
                opened={editModalOpened}
                close={closeEditModal}
                reservoir={reservoir?.data}
            />

            <ReservoirDeleteModal opened={deleteModalOpened} close={closeDeleteModal} />

            <PipeAddModal
                opened={addPipeModalOpened}
                close={closeAddPipeModal}
                pendingConnection={pendingConnection}
                setPendingConnection={setPendingConnection}
            />
        </>
    );
};
