import { AppShell, Burger, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { FlowCanvas } from '@/src/features';

import { Navbar } from '../../widgets';

export const FlowChart = () => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 80,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header p="10px">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Title order={2}>Водокал</Title>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main>
                <FlowCanvas />
            </AppShell.Main>
        </AppShell>
    );
};
