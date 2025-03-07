import { Handle, Position } from '@xyflow/react';
import { useState, useEffect } from 'react';
import { MdOutlineOilBarrel as ReservoirIcon } from 'react-icons/md';

export const Reservoir = () => {
    const [level, setLevel] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLevel(() => {
                const newLevel = Math.floor(Math.random() * 11);
                return newLevel;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                position: 'relative',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '20px',
                width: '120px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
                style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: 'green',
                    borderRadius: '50%',
                    border: '2px solid darkgreen',
                    zIndex: 5,
                }}
            />

            <div style={{ position: 'absolute', zIndex: 2 }}>
                <ReservoirIcon size={100} />
            </div>

            <Handle
                type="source"
                position={Position.Right}
                style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: 'blue',
                    borderRadius: '50%',
                    border: '2px solid darkblue',
                    zIndex: 5,
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: `${(level / 10) * 100}%`,
                    backgroundColor: 'dodgerblue',
                    transition: 'height 0.5s ease-in-out',
                }}
            />
        </div>
    );
};
