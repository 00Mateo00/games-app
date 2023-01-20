import React from 'react';
import Pong from './pong/Pong';

const Games: React.FC = () => {
    return (
        <div className='h-full w-full'>
            <Pong />
        </div>
    );
};

export default Games;
