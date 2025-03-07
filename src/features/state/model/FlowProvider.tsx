import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import { createContext, useReducer } from 'react';

import type { FlowAction, FlowState } from './actions';

export const FlowContext = createContext<{
    state: FlowState;
    dispatch: React.Dispatch<FlowAction>;
} | null>(null);

const initialState: FlowState = {
    nodes: [],
    edges: [],
};

export const flowReducer = (state: FlowState, action: FlowAction): FlowState => {
    switch (action.type) {
        case 'ADD_NODE':
            return {
                ...state,
                nodes: [
                    ...state.nodes,
                    {
                        id: nanoid(),
                        position: { x: 100, y: 100 },
                        type: 'reservoir',
                        data: { label: 'Node' },
                        ...action.payload,
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
        case 'UPDATE_NODE':
            return {
                ...state,
                nodes: action.payload,
            };
        case 'CLEAR_GRAPH':
            return initialState;
        case 'LOAD_STATE':
            return action.payload;
        default:
            return state;
    }
};

type FlowProviderProps = {
    children: ReactNode;
};

export const FlowProvider = ({ children }: FlowProviderProps) => {
    const [state, dispatch] = useReducer(flowReducer, initialState);

    return <FlowContext.Provider value={{ state, dispatch }}>{children}</FlowContext.Provider>;
};
