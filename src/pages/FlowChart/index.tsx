import { AppShell } from '@mantine/core';

import { FlowCanvas } from '@/src/features';
import { Navbar } from '@/src/widgets';

export const FlowChart = () => {
    return (
        <>
            <AppShell.Main>
                <FlowCanvas />
            </AppShell.Main>
            <AppShell.Aside p="md">
                <Navbar />
            </AppShell.Aside>
        </>
    );
};
