/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './nextTetromino.scss';

interface Props {
    tetromino: [string, number[][]];
    /* tetromino: number[][]; */
}

const NextTetromino: React.FC<Props> = ({ tetromino }) => {
    function placeTetromino(): number[][] {
        const newBoard: number[][] = [];
        for (let i = 0; i < 4; i++) {
            const row: number[] = [];
            for (let j = 0; j < 4; j++) {
                row.push(0);
            }
            newBoard.push(row);
        }

        tetromino[1].forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    newBoard[i][j] = cell;
                }
            });
        });
        return newBoard;
    }
    const board = placeTetromino();
    return (
        <div
            className={`listGrid grid h-min w-full grid-cols-4 grid-rows-4 rounded-lg border-4 border-purple-900 bg-black`}
        >
            {board.map((e) =>
                e.map((el, i) => (
                    <div key={i} className={`cell cell-${el}`}></div>
                ))
            )}
        </div>
    );
};
export default NextTetromino;
