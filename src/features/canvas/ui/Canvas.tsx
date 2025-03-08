import { Button, Flex, Modal, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import type { Edge } from '@xyflow/react';
import { applyNodeChanges, applyEdgeChanges, Background, ReactFlow, addEdge } from '@xyflow/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createNewPipe, getSpaceById, Pipe, Reservoir } from '@/src/entities';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

import { useFlow } from '../../state';

export const FlowCanvas = () => {
    const { state, dispatch } = useFlow();

    const { id } = useParams();

    const [opened, { open, close }] = useDisclosure(false);
    const [pendingConnection, setPendingConnection] = useState<Edge | null>(null);

    const form = useForm({
        initialValues: { diameter: 0 },
        validate: {
            diameter: (value: number) => (value > 0 ? null : 'Диаметр должен быть больше 0'),
        },
    });

    const nodeTypes = useMemo(() => ({ reservoir: Reservoir }), []);
    const edgeTypes = useMemo(() => ({ pipe: Pipe }), []);

    const handleConnectPipes = useCallback(
        (connection) => {
            setPendingConnection(connection);
            open();
        },
        [open]
    );

    const handleConfirmConnection = async () => {
        if (!pendingConnection) return;

        const { hasErrors } = form.validate();
        if (hasErrors) return;

        try {
            const { source, target } = pendingConnection;

            const data = await createNewPipe(form.values.diameter, Number(source), Number(target));

            const edge: Edge = {
                ...pendingConnection,
                type: 'pipe',
                id: String(data.id),
                data: { diameter: data.diameter },
            };

            dispatch({
                type: 'ADD_EDGE',
                payload: addEdge(edge, state.edges),
            });
        } catch (error) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: (error as Error).message,
            });
        }

        close();
        setPendingConnection(null);
        form.reset();
    };

    useEffect(() => {
        (async () => {
            try {
                const { reservoirs, pipes } = await getSpaceById(Number(id));

                dispatch({ type: 'LOAD_STATE', payload: { reservoirs, pipes } });
            } catch (error) {
                showNotification({
                    variant: NOTIFICATION_VARIANT.ERROR,
                    message: (error as Error).message as string,
                });
            }
        })();
    }, []);

    return (
        <Flex w="100%" h="100vh">
            <ReactFlow
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                nodes={state.nodes}
                edges={state.edges}
                onNodesChange={(nodes) =>
                    dispatch({ type: 'UPDATE_NODE', payload: applyNodeChanges(nodes, state.nodes) })
                }
                onEdgesChange={(edges) =>
                    dispatch({
                        type: 'UPDATE_EDGES',
                        payload: applyEdgeChanges(edges, state.edges),
                    })
                }
                onConnect={handleConnectPipes}
            >
                <Background />
            </ReactFlow>

            <Modal opened={opened} onClose={close} title="Введите параметры соединения">
                <form onSubmit={form.onSubmit(handleConfirmConnection)}>
                    <NumberInput
                        label="Диаметр трубы"
                        {...form.getInputProps('diameter')}
                        min={1}
                        max={100}
                    />
                    <Button fullWidth mt="md" type="submit">
                        Подтвердить
                    </Button>
                </form>
            </Modal>
        </Flex>
    );
};
