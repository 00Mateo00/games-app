import React from 'react';
import './brick.scss';

interface Props {
    state: number;
}

const Bricks: React.FC<Props> = ({ state }) => {
    return (
        <div className={`brick h-full w-full bg-lime-700 brick-${state}`}></div>
    );
};
export default Bricks;
