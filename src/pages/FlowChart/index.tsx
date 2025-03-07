import { Flex } from '@mantine/core';

import { FlowCanvas } from '@/src/features';

import { Navbar } from '../../widgets';

export const FlowChart = () => {
    return (
        <Flex w="100%" h="100%">
            <Navbar />
            <FlowCanvas />
        </Flex>
    );
};
