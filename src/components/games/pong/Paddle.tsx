import React from 'react';
import './paddle.scss';
interface PaddleProps {
    y: number;
    right: boolean;
}

const Paddle: React.FC<PaddleProps> = ({ y, right }) => {
    return (
        <div
            className='paddle'
            style={{
                top: y,
                right: right ? '5px' : 'initial',
                left: right ? 'initial' : '5px',
            }}
        />
    );
};

export default Paddle;
