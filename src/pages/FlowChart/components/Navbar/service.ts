import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export type Space = {
  id: number;
  name: string;
  tanksCount: number;
};

export const useNavbarState = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<Space[]>([
    { id: 1, name: "Пространство 1", tanksCount: 10 },
    { id: 2, name: "Пространство 2", tanksCount: 5 },
  ]);
  const [opened, setOpened] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState("");
  const [editedSpaceName, setEditedSpaceName] = useState("");
  const [editingSpaceId, setEditingSpaceId] = useState<number | null>(null);
  const [toolsOpen, setToolsOpen] = useState(false);

  return {
    id,
    navigate,
    spaces,
    setSpaces,
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
