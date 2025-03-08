import type { PipeType, ReservoirType } from '@/src/entities';

import type { Edge, Node } from './types';

export type FlowState = {
    nodes: Node[];
    edges: Edge[];
};

type AddNodeAction = {
    type: 'ADD_NODE';
    payload: Node;
};

type UpdateNodeAction = {
    type: 'UPDATE_NODE';
    payload: Node[];
};

type RemoveNodeAction = {
    type: 'REMOVE_NODE';
    payload: string;
};

type AddEdgeAction = {
    type: 'ADD_EDGE';
    payload: Edge[];
};

type UpdateEdgeAction = {
    type: 'UPDATE_EDGES';
    payload: Edge[];
};

type RemoveEdgeAction = {
    type: 'REMOVE_EDGE';
    payload: string;
};

type ClearGraphAction = {
    type: 'CLEAR_GRAPH';
};

type LoadStateAction = {
    type: 'LOAD_STATE';
    payload: {
        reservoirs: ReservoirType[];
        pipes: PipeType[];
    };
};

export type FlowAction =
    | AddNodeAction
    | RemoveNodeAction
    | AddEdgeAction
    | RemoveEdgeAction
    | ClearGraphAction
    | LoadStateAction
    | UpdateEdgeAction
    | UpdateNodeAction;
