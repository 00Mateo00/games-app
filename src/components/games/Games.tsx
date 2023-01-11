import React from 'react';
import MineSweeper from './mineSweeper/MineSweeper';

const Games: React.FC = () => {
    return (
        <div className='h-full w-full'>
            <MineSweeper />;
        </div>
    );
};

export default Games;
