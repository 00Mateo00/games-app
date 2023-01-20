import React from 'react';
import './ball.scss';

interface BallProps {
    x: number;
    y: number;
}

const Ball: React.FC<BallProps> = ({ x, y }) => {
    return <div className='ball' style={{ left: x, top: y }} />;
};

export default Ball;
