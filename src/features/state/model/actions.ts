import type { PipeType, ReservoirType } from '@/src/entities';

import type { Edge, Node } from './types';

export type FlowState = {
    selectedNode: number | null;
    selectedEdge: number | null;
    nodes: Node[];
    edges: Edge[];
};

type AddNodeAction = {
    type: 'ADD_NODE';
    payload: ReservoirType;
};

type UpdateNodeAction = {
    type: 'UPDATE_NODE';
    payload: Node[];
};

type UpdateNodeDataAction = {
    type: 'UPDATE_DATA';
    payload: ReservoirType;
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

type SelectNodeAction = {
    type: 'SELECT_NODE';
    payload: number | null;
};

type SelectEdgeAction = {
    type: 'SELECT_EDGE';
    payload: number | null;
};

export type FlowAction =
    | AddNodeAction
    | UpdateNodeDataAction
    | RemoveNodeAction
    | AddEdgeAction
    | RemoveEdgeAction
    | ClearGraphAction
    | LoadStateAction
    | UpdateEdgeAction
    | UpdateNodeAction
    | SelectNodeAction
    | SelectEdgeAction;
