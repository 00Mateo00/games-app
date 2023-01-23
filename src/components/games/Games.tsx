import React from 'react';
import Tetris from './tetris/Tetris';

const Games: React.FC = () => {
    return (
        <div className='h-full w-full'>
            <Tetris />
        </div>
    );
};

export default Games;
