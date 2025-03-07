import { BaseEdge } from '@xyflow/react';

export const Pipe = ({ id, sourceX, sourceY, targetX, targetY }) => {
    // Находим точку перегиба, которая будет в центре между source и target
    const midX = (sourceX + targetX) / 2;
    const midY = (sourceY + targetY) / 2;

    // В зависимости от расположения, генерируем путь с перегибом
    const edgePath = [
        `M${sourceX},${sourceY}`, // Начало в источнике
        `L${midX},${sourceY}`, // Горизонтально до середины по X
        `L${midX},${targetY}`, // Вертикально до целевой точки по Y
        `L${targetX},${targetY}`, // Заканчиваем в целевой точке
    ];

    return (
        <BaseEdge
            id={id}
            path={edgePath.join(' ')}
            style={{
                stroke: 'gray', // Цвет трубы
                strokeWidth: 8, // Толщина линии
                strokeLinecap: 'round', // Закругленные углы
                strokeLinejoin: 'round', // Закругленные соединения
                fill: 'none', // Без заливки
                opacity: 0.8, // Прозрачность
            }}
        />
    );
};
