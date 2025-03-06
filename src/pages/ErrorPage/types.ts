import type React from 'react';

export type ErrorPageProps = {
    title: string;
    subtitle: React.ReactNode;
    onClick: () => void;
    buttonText: string;
};
