import { ReactFlowProvider } from '@xyflow/react';
import type { ReactNode } from 'react';
import { createContext, useReducer } from 'react';

import { formatReservoirsToNodes } from '@/src/shared/lib/parsers';
import { formatPipesToEdges } from '@/src/shared/lib/parsers/formatPipesToEdges';

import type { FlowAction, FlowState } from './actions';

export const FlowContext = createContext<{
    state: FlowState;
    dispatch: React.Dispatch<FlowAction>;
} | null>(null);

const initialState: FlowState = {
    selectedNode: null,
    selectedEdge: null,
    nodes: [],
    edges: [],
};

export const flowReducer = (state: FlowState, action: FlowAction): FlowState => {
    switch (action.type) {
        case 'SELECT_NODE':
            return {
                ...state,
                selectedNode: action.payload,
            };
        case 'ADD_NODE':
            return {
                ...state,
                nodes: [
                    ...state.nodes,
                    {
                        id: String(action.payload.id),
                        position: { x: 100, y: 100 },
                        type: 'reservoir',
                        data: action.payload,
                    },
                ],
            };
        case 'REMOVE_NODE':
            return {
                ...state,
                nodes: state.nodes.filter((node) => node.id !== action.payload),
                edges: state.edges.filter(
                    (edge) => edge.source !== action.payload && edge.target !== action.payload
                ),
            };
        case 'SELECT_EDGE':
            return {
                ...state,
                selectedEdge: action.payload,
            };
        case 'ADD_EDGE':
            return {
                ...state,
                edges: action.payload,
            };
        case 'REMOVE_EDGE':
            return {
                ...state,
                edges: state.edges.filter((edge) => edge.id !== action.payload),
            };
        case 'UPDATE_DATA': {
            const updatedNodes = state.nodes.map((node) => {
                if (node.id === action.payload.id.toString()) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...action.payload,
                        },
                    };
                }
                return node;
            });

            return {
                ...state,
                nodes: updatedNodes,
            };
        }
        case 'UPDATE_NODE':
            return {
                ...state,
                nodes: action.payload,
            };
        case 'CLEAR_GRAPH':
            return initialState;
        case 'LOAD_STATE': {
            const { reservoirs, pipes } = action.payload;

            const formattedNodes = formatReservoirsToNodes(reservoirs);
            const formattedPipes = formatPipesToEdges(pipes);

            return {
                ...state,
                nodes: formattedNodes,
                edges: formattedPipes,
            };
        }
        default:
            return state;
    }
};

type FlowProviderProps = {
    children: ReactNode;
};

export const FlowProvider = ({ children }: FlowProviderProps) => {
    const [state, dispatch] = useReducer(flowReducer, initialState);

    return (
        <FlowContext.Provider value={{ state, dispatch }}>
            <ReactFlowProvider>{children}</ReactFlowProvider>
        </FlowContext.Provider>
    );
};
