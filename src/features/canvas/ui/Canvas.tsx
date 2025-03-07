import { Flex } from '@mantine/core';
import { applyNodeChanges, applyEdgeChanges, Background, ReactFlow, addEdge } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { useCallback, useMemo } from 'react';

import { Pipe, Reservoir } from '@/src/entities';

import { useFlow } from '../../state';

export const FlowCanvas = () => {
    const { state, dispatch } = useFlow();

    const nodeTypes = useMemo(() => ({ reservoir: Reservoir }), []);
    const edgeTypes = useMemo(() => ({ pipe: Pipe }), []);

    const handleConnectPipes = useCallback(
        (connection) => {
            const edge = {
                ...connection,
                type: 'pipe',
                id: nanoid(),
            };
            dispatch({
                type: 'ADD_EDGE',
                payload: addEdge(edge, state.edges),
            });
        },
        [state.edges, dispatch]
    );

    return (
        <Flex w="100%" h="100vh">
            <ReactFlow
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                nodes={state.nodes}
                edges={state.edges}
                onNodesChange={(nodes) =>
                    dispatch({
                        type: 'UPDATE_NODE',
                        payload: applyNodeChanges(nodes, state.nodes),
                    })
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
        </Flex>
    );
};
