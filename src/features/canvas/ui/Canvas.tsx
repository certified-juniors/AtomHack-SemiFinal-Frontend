import { Flex } from '@mantine/core';
import { applyNodeChanges, applyEdgeChanges, Background, ReactFlow, addEdge } from '@xyflow/react';

import { useFlow } from '../../state';

export const FlowCanvas = () => {
    const { state, dispatch } = useFlow();

    return (
        <Flex w="100%" h="100vh">
            <ReactFlow
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
                onConnect={(params) =>
                    dispatch({
                        type: 'ADD_EDGE',
                        payload: addEdge(params, state.edges),
                    })
                }
            >
                <Background />
            </ReactFlow>
        </Flex>
    );
};
