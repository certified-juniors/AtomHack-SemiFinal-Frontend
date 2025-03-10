import { Button } from '@mantine/core';
import type { EdgeProps } from '@xyflow/react';
import { BaseEdge, EdgeLabelRenderer } from '@xyflow/react';

import { useFlow } from '@/src/features';
import showNotification from '@/src/shared/lib/notifications';
import { NOTIFICATION_VARIANT } from '@/src/shared/lib/notifications/types';

import { deletePipeById } from '../../api';

export const Pipe = ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) => {
    const { dispatch } = useFlow();

    const midX = (sourceX + targetX) / 2;
    const midY = (sourceY + targetY) / 2;
    const edgePath = [
        `M${sourceX},${sourceY}`,
        `L${midX},${sourceY}`,
        `L${midX},${targetY}`,
        `L${targetX},${targetY}`,
    ];

    const handleDeleteEdge = async () => {
        try {
            const response = await deletePipeById(Number(id));

            showNotification({
                variant: NOTIFICATION_VARIANT.SUCCESS,
                message: response,
            });

            dispatch({
                type: 'REMOVE_EDGE',
                payload: String(id),
            });
        } catch (error) {
            showNotification({
                variant: NOTIFICATION_VARIANT.ERROR,
                message: (error as Error).message,
            });
        }
    };

    return (
        <>
            <BaseEdge
                id={String(id)}
                path={edgePath.join(' ')}
                style={{
                    stroke: 'gray',
                    strokeWidth: 8,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    fill: 'none',
                    opacity: 0.4,
                }}
            />

            <EdgeLabelRenderer>
                <Button
                    style={{
                        position: 'absolute',
                        zIndex: 1000,
                        left: `${midX}px`,
                        top: `${midY}px`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'all',
                    }}
                    bg="red"
                    size="compact-xs"
                    onClick={handleDeleteEdge}
                >
                    Удалить
                </Button>
            </EdgeLabelRenderer>
        </>
    );
};
