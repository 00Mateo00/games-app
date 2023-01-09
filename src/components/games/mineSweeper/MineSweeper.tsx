import React, { useContext } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import Cell from './Cell';

const MineSweeper: React.FC = () => {
    const { generateBoard, board } = useContext(GlobalContext);

    return (
        <div className='h-full w-full bg-yellow-400'>
            <button
                onClick={() => {
                    generateBoard(9, 9, 'easy', true);
                }}
                className='primary-button h-min w-52 rounded-lg'
            >
                play
            </button>

            <div className='board row-auto grid w-max grid-cols-9'>
                {board.map((row) =>
                    row.map((cell, columnIndex) => (
                        <Cell key={columnIndex} cell={cell} />
                    ))
                )}
            </div>
        </div>
    );
};
export default MineSweeper;
