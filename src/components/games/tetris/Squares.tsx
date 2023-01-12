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
    const { state, X, Y } = square;
    return <div className={`cell-${state}`}>{`Y:${Y} X:${X}`}</div>;
};
export default Squares;
