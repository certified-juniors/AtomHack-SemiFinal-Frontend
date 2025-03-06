import { Button, Center, Flex, Text } from '@mantine/core';

import type { ErrorPageProps } from './types';

export const ErrorPage: React.FC<ErrorPageProps> = ({ title, subtitle, onClick, buttonText }) => {
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1,
                }}
            >
                <source src="/videos/space_bgrnd.mp4" type="video/mp4" />
            </video>

            <Center
                style={{
                    position: 'relative',
                    height: '100vh',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Flex
                    direction="column"
                    style={{
                        background: 'rgba(0,0,0,0.9)',
                        borderRadius: '10px',
                        padding: '20px',
                        gap: '20px',
                        width: '50%',
                        height: 'fit-content',
                    }}
                >
                    <span style={{ fontSize: '30px', fontWeight: 700 }}>{title}</span>
                    <Text size="md">{subtitle}</Text>
                    <Button
                        onClick={onClick}
                        size="lg"
                        color="dark"
                        style={{
                            width: 'fit-content',
                            justifyContent: 'center',
                            margin: '20px auto',
                        }}
                    >
                        {buttonText}
                    </Button>
                </Flex>
            </Center>
            <h1>Page Not Found</h1>
        </div>
    );
};
