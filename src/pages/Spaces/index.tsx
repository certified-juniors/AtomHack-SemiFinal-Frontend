import { AppShell, Burger, Flex, Space, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';

import { Sidebar } from '@/src/widgets';

export const Spaces = () => {
    const [opened, { toggle }] = useDisclosure();

    const navigate = useNavigate();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: '25vw',
                breakpoint: 'lg',
                collapsed: {
                    desktop: !opened,
                    mobile: !opened,
                },
            }}
            aside={{
                width: 60,
                breakpoint: 'xs',
            }}
        >
            <AppShell.Header p="10px">
                <Flex align="center">
                    <Burger opened={opened} onClick={toggle} size="sm" />
                    <Space w={20} />
                    <Title style={{ cursor: 'pointer' }} order={2} onClick={() => navigate('/')}>
                        Водокал
                    </Title>
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar>
                <Sidebar />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};
