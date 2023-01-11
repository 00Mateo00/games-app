import React, { useState } from 'react';
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
        x: 3,
        y: 0,
    },

    L: {
        shape: [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ],
        x: 3,
        y: 0,
    },

    O: {
        shape: [
            [4, 4],
            [4, 4],
        ],
        x: 3,
        y: 0,
    },

    S: {
        shape: [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0],
        ],
        x: 3,
        y: 0,
    },

    T: {
        shape: [
            [0, 6, 0],
            [6, 6, 6],
            [0, 0, 0],
        ],
        x: 3,
        y: 0,
    },

    Z: {
        shape: [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ],
        x: 3,
        y: 0,
    },
};

/* const SHAPE = {
    I: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],

    J: [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
    ],

    L: [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
    ],

    O: [
        [4, 4],
        [4, 4],
    ],

    S: [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
    ],

    T: [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
    ],

    Z: [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
    ],
};
 */

/*
function getShape(shape:shape) {
    const I = [[0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]];

    const J = [[0, 2, 0],
    [0, 2, 0],
    [2, 2, 0]];

    const L = [[0, 3, 0],
    [0, 3, 0],
    [0, 3, 3]];

    const O = [[4, 4],
    [4, 4]];

    const S =  [[0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]];

    const T =   [[0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]];

    const Z =  [[7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]];
}
 */

const Tetris: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { I, J, L, O, S, T, Z } = Forms;

    const [actualTetromino, setActualTetromino] = useState(I);

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

    function array(): void {
        const X = Array(10).fill(null);
        const Y = Array(20).fill(X);
        console.log(Y);
    }

    array();

    return (
        <>
            <div className='tetris-board'>
                {actualTetromino.shape.map((row, i) => (
                    <div key={i} className='tetris-row'>
                        {row.map((cell, j) => (
                            <div
                                key={j}
                                className={`tetris-cell color-${cell}`}
                                style={{
                                    top: i + actualTetromino.y,
                                    left: j + actualTetromino.x,
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div>
                <button onClick={handleLeft}>Left</button>
                <button onClick={handleRight}>Right</button>
                <button onClick={handleRotate}>Rotate</button>
            </div>
        </>
    );
};
export default Tetris;
