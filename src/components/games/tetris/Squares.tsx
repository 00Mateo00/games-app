import React from 'react';
import './cells.scss';

interface newBoard {
    state: number;
    Y: number;
    X: number;
}

interface Props {
    square: newBoard;
}

const Squares: React.FC<Props> = ({ square }) => {
    const { state } = square;
    return (
        <div className={`cell item-center flex justify-center cell-${state}`}>
            {state}
        </div>
    );
};
export default Squares;
