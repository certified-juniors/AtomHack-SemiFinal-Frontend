import { Stack, Button } from '@mantine/core';

type ToolsPanelProps = {
    toolsOpen: boolean;
    toggleTools?: () => void;
};

export const ToolsPanel: React.FC<ToolsPanelProps> = ({ toolsOpen }) => (
    <Stack>
        <Button variant="outline">Инструмент 1</Button>
        <Button variant="outline">Инструмент 2</Button>
        <Button variant="outline">Инструмент 3</Button>
        <Button variant="outline">Инструмент 4</Button>
    </Stack>
);
