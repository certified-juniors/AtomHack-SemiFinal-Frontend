import { Table, Tooltip } from '@mantine/core';
import { Handle, Position } from '@xyflow/react';

import type { Node } from '@/src/features';
import { useFlow } from '@/src/features';

export const Reservoir = ({ data }: Partial<Node>) => {
    const {
        dispatch,
        state: { selectedNode },
    } = useFlow();

    const isReservoirSelected = selectedNode === data?.id;

    const renderDataTable = () => {
        return (
            <Table variant="vertical" c="black">
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th>Площадь (м²)</Table.Th>
                        <Table.Td>{data?.area.toFixed(2)}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Уровень воды (м)</Table.Th>
                        <Table.Td>{data?.level.toFixed(2)}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Давление (КПа)</Table.Th>
                        <Table.Td>{data?.pressure.toFixed(2)}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        );
    };

    return (
        <Tooltip
            label={renderDataTable()}
            styles={{
                tooltip: {
                    backgroundColor: 'whitesmoke',
                },
            }}
            position="bottom"
            withArrow
        >
            <div
                onClick={() => {
                    dispatch({
                        type: 'SELECT_NODE',
                        payload: data?.id ?? null,
                    });
                }}
                style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    border: `${isReservoirSelected ? '2px' : '1px'} solid ${isReservoirSelected ? 'black' : 'gray'}`,
                    borderRadius: '10px',
                    width: '120px',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#4da91b',
                        borderRadius: '50%',
                        border: '2px solid #3d920d',
                        zIndex: 5,
                    }}
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#004ecd',
                        borderRadius: '50%',
                        border: '2px solid #0043b5',
                        zIndex: 5,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: `${((data?.level ?? 0) / 10) * 100}%`,
                        backgroundColor: '#7496c0',
                        transition: 'height 0.5s ease-in-out',
                    }}
                />
            </div>
        </Tooltip>
    );
};
