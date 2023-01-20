import React from 'react';
import './square.scss';

interface Props {
    square: number;
    square2: number;
}

const Squares: React.FC<Props> = ({ square, square2 }) => {
    const state = square > 0 ? square : square2;

    return (
        <div className={`item-center flex justify-center cell-${state} cell `}>
        </div>
    );
};
export default Squares;
