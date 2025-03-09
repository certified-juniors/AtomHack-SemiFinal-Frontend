import { Flex } from '@mantine/core';

export const Main = () => {
    return (
        <Flex>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    backgroundImage: 'url(./images/landing.webp)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    filter: 'blur(4px)',
                }}
            />
        </Flex>
    );
};
