import { Flex } from '@mantine/core';
import type { NodeChange } from '@xyflow/react';
import {
    applyNodeChanges,
    applyEdgeChanges,
    Background,
    ReactFlow,
    useReactFlow,
    MiniMap,
} from '@xyflow/react';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getSpaceById, Pipe, Reservoir } from '@/src/entities';
import { deleteReservoirById } from '@/src/entities/reservoir/api';
import { useStompSocket } from '@/src/shared/api/websocket/Websocket';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

import type { Node } from '../../state';
import { useFlow } from '../../state';

import type { FlowCanvasProps } from './types';

export const FlowCanvas = ({ connectPipes }: FlowCanvasProps) => {
    const { state, dispatch } = useFlow();
    const { id } = useParams();

    const { client, isConnected } = useStompSocket();

    const nodeTypes = useMemo(() => ({ reservoir: Reservoir }), []);
    const edgeTypes = useMemo(() => ({ pipe: Pipe }), []);

    const flowInstance = useReactFlow();

    useEffect(() => {
        if (state.nodes.length > 0) {
            setTimeout(() => {
                flowInstance.fitView({ padding: 0.2 });
            }, 100);
        }
    }, []);

    const handleChangeNodes = async (nodes: NodeChange<Node>[]) => {
        try {
            for (const node of nodes) {
                const { id, type } = node;

                if (!id) continue;

                switch (type) {
                    case 'remove': {
                        const numericId = Number(id);
                        if (isNaN(numericId)) break;

                        const response = await deleteReservoirById(numericId);
                        showNotification({
                            variant: NOTIFICATION_VARIANT.SUCCESS,
                            message: response,
                        });

                        dispatch({ type: 'REMOVE_NODE', payload: id });
                        break;
                    }

                    default:
                        dispatch({
                            type: 'UPDATE_NODE',
                            payload: applyNodeChanges(nodes, state.nodes),
                        });
                }
            }
        } catch (error) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: (error as Error).message,
            });
        }
    };

    useEffect(() => {
        (async () => {
            try {
                if (!id) dispatch({ type: 'LOAD_STATE', payload: { reservoirs: [], pipes: [] } });

                const { reservoirs, pipes } = await getSpaceById(Number(id));

                dispatch({ type: 'LOAD_STATE', payload: { reservoirs, pipes } });
            } catch (error) {
                showNotification({
                    variant: NOTIFICATION_VARIANT.ERROR,
                    message: (error as Error).message as string,
                });
            }
        })();

        return () => {
            dispatch({
                type: 'CLEAR_GRAPH',
            });
        };
    }, [dispatch, id]);

    const levelEventHandler = ({ body }: { body: string }) => {
        const { command, reservoir } = JSON.parse(body);
        switch (command) {
            case 'UPDATE':
                dispatch({
                    type: 'UPDATE_DATA',
                    payload: reservoir,
                });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (client) {
            client.subscribe(`/topic/space/${id}`, levelEventHandler, { id: `${id}` });
        }

        return () => {
            if (client) {
                client.unsubscribe(`${id}`);
            }
        };
    }, [id, isConnected]);

    return (
        <Flex w="100%" h="calc(100vh - 3.75rem)" style={{ zIndex: 1000 }}>
            <ReactFlow
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                nodes={state.nodes}
                edges={state.edges}
                selectionOnDrag
                onNodesChange={handleChangeNodes}
                onEdgesChange={(edges) => {
                    dispatch({
                        type: 'UPDATE_EDGES',
                        payload: applyEdgeChanges(edges, state.edges),
                    });
                }}
                onConnect={connectPipes}
            >
                <Background />
                <MiniMap nodeStrokeWidth={3} position="bottom-left" />
            </ReactFlow>
        </Flex>
    );
};
