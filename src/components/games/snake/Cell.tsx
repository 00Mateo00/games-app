import React from 'react';
import './cell.scss';

type Directions = 'up' | 'down' | 'left' | 'right';
interface Props {
    state: number;
    direction: Directions;
}

const Cell: React.FC<Props> = ({ state, direction }) => {
    return (
        <div
            className={`flex h-full w-full items-center justify-center snakeCell-${state}`}
        ></div>
    );
};
export default Cell;
