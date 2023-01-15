import React from 'react';
import './cells.scss';

interface Props {
    square: number;
    square2: number;
}

const Squares: React.FC<Props> = ({ square, square2 }) => {
    let state = 0;
    if (square2 > 0) {
        state = 9;
    } else {
        state = square;
    }

    return (
        <div className={`cell item-center flex justify-center cell-${state}`}>
            {state}
        </div>
    );
};
export default Squares;
