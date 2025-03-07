import { Stack, Button, ActionIcon } from '@mantine/core';
import { IoAdd as AddIcon } from 'react-icons/io5';

import { useFlow } from '@/src/features';

type ToolsPanelProps = {
    toolsOpen: boolean;
    toggleTools?: () => void;
};

export const ToolsPanel: React.FC<ToolsPanelProps> = () => {
    const { state, dispatch } = useFlow();

    return (
        <Stack>
            <ActionIcon
                variant="filled"
                aria-label="Add Node"
                onClick={() => dispatch({ type: 'ADD_NODE', payload: {} })}
            >
                <AddIcon />
            </ActionIcon>
            <Button variant="outline">Инструмент 2</Button>
            <Button variant="outline">Инструмент 3</Button>
            <Button variant="outline">Инструмент 4</Button>
        </Stack>
    );
};
