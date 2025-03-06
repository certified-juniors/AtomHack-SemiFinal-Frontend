import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import type { Space } from '../../entities/space';

export const useNavbarState = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const selectSpace = (id: number | string) => {
        navigate(`/space/${id}`);
    };
    const [spaces, setSpaces] = useState<Space[]>([
        { id: 1, name: 'Пространство 1', createdAt: '22.01.2025' },
        { id: 2, name: 'Пространство 2', createdAt: '22.01.2025' },
    ]);
    const [opened, setOpened] = useState(false);
    const [newSpaceName, setNewSpaceName] = useState('');
    const [editedSpaceName, setEditedSpaceName] = useState('');
    const [editingSpaceId, setEditingSpaceId] = useState<number | null>(null);
    const [toolsOpen, setToolsOpen] = useState(false);

    return {
        id,
        navigate,
        spaces,
        setSpaces,
        selectSpace,
        opened,
        setOpened,
        newSpaceName,
        setNewSpaceName,
        editedSpaceName,
        setEditedSpaceName,
        editingSpaceId,
        setEditingSpaceId,
        toolsOpen,
        setToolsOpen,
    };
};
