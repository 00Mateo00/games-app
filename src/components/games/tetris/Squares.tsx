import React from 'react';
import './cells.scss';

interface newBoard {
    state: number;
    Y: number;
    X: number;
}

interface Props {
    square: newBoard;
    square2: newBoard;
}

const Squares: React.FC<Props> = ({ square, square2 }) => {
    let state = 0;
    if (square2.state > 0) {
        state = 9;
    } else {
        state = square.state;
    }

    return (
        <div className={`cell item-center flex justify-center cell-${state}`}>
            {state}
        </div>
    );
};
export default Squares;
