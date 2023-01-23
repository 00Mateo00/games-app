import React from 'react';
import './paddle.scss';
interface Props {
    y: number;
    right: boolean;
}

const Paddle: React.FC<Props> = ({ y, right }) => {
    return (
        <div
            className={`paddle ${right ? 'right' : 'left'}`}
            style={{
                top: y,
                right: right ? '5px' : 'initial',
                left: right ? 'initial' : '5px',
            }}
        />
    );
};

export default Paddle;
