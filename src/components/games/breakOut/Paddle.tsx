import React from 'react';

interface Props {
    Xposition: number;
    paddleWidth: number;
}

const Paddle: React.FC<Props> = ({ Xposition, paddleWidth }) => {
    return (
        <div
            className='absolute h-1 rounded-sm bg-white'
            style={{
                bottom: '5px',
                left: `${Xposition}px`,
                width: `${paddleWidth}px`,
            }}
        ></div>
    );
};
export default Paddle;
