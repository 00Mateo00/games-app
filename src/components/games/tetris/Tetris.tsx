import React, { useState } from 'react';
import Squares from './Squares';
import './tetris.scss';

interface Tetromino {
    shape: number[][];
    x: number;
    y: number;
}

const Forms: Record<string, Tetromino> = {
    I: {
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
        x: 0,
        y: 0,
    },

    J: {
        shape: [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0],
        ],
        x: 0,
        y: 0,
    },

    L: {
        shape: [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ],
        x: 0,
        y: 0,
    },

    O: {
        shape: [
            [4, 4],
            [4, 4],
        ],
        x: 0,
        y: 0,
    },

    S: {
        shape: [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0],
        ],
        x: 0,
        y: 0,
    },

    T: {
        shape: [
            [0, 6, 0],
            [6, 6, 6],
            [0, 0, 0],
        ],
        x: 0,
        y: 0,
    },

    Z: {
        shape: [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ],
        x: 0,
        y: 0,
    },
};

interface newBoard {
    state: number;
    Y: number;
    X: number;
}

type rotation = 1 | 0 | -1;

const Tetris: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { I, J, L, O, S, T, Z } = Forms;

    const [actualTetromino, setActualTetromino] = useState(I);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [postionY, setPostionY] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [postionX, setPostionX] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rotation, setRotation] = useState<rotation>(0);

    const [board, setBoard] = useState<newBoard[][]>([]);
    function BoardInitializer(numRows: number, numColumns: number): void {
        const newBoard = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numColumns; j++) {
                row.push({ state: 0, Y: i, X: j });
            }
            newBoard.push(row);
        }
        setBoard(newBoard);
    }

    function placeTetromino(): void {
        const newBoard = [...board];
        actualTetromino.shape.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    newBoard[actualTetromino.y + i][
                        actualTetromino.x + j
                    ].state = cell;
                }
            });
        });
        setBoard(newBoard);
    }

    function handleLeft(): void {
        setActualTetromino({ ...actualTetromino, x: actualTetromino.x - 1 });
    }

    function handleRight(): void {
        setActualTetromino({ ...actualTetromino, x: actualTetromino.x + 1 });
    }

    function handleRotate(): void {
        // Transpose and reverse the rows of the shape to rotate it 90 degrees
        const rotatedShape = actualTetromino.shape[0].map((val, index) =>
            actualTetromino.shape.map((row) => row[index]).reverse()
        );
        setActualTetromino({ ...actualTetromino, shape: rotatedShape });
    }

    return (
        <>
            <div className='tetris-board'>
                {board.map((row) =>
                    row.map((square, columnIndex) => (
                        <Squares key={columnIndex} square={square} />
                    ))
                )}
            </div>

            <div>
                <button onClick={handleLeft}>Left</button>
                <button onClick={handleRight}>Right</button>
                <button onClick={handleRotate}>Rotate</button>
                <button
                    onClick={() => {
                        BoardInitializer(20, 10);
                    }}
                >
                    init
                </button>
                <button onClick={() => placeTetromino()}>place</button>
            </div>
        </>
    );
};
export default Tetris;
