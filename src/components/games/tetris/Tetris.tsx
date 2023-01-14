/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Squares from './Squares';
import './tetris.scss';

/* const Forms: Record<string, number[][]> = {
    TEST: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ],
    TEST2: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
    ],
    ILarge: [
        [0, 3, 9, 9],
        [0, 3, 0, 0],
        [0, 3, 0, 0],
        [0, 3, 0, 0],
    ],
    I: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
    J: [
        [0, 2, 0],
        [0, 2, 0],
        [1, 2, 0],
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
}; */

const Forms: number[][][] = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 2, 0],
        [0, 2, 0],
        [1, 2, 0],
    ],
    [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
    ],
    [
        [4, 4],
        [4, 4],
    ],
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
    ],
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
    ],
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
    ],
];

interface newBoard {
    state: number;
    Y: number;
    X: number;
}

type angles = 90 | 0 | -90;
type directions = 'left' | 'right' | 'bottom';

const Tetris: React.FC = () => {
    const [actualTetromino, setActualTetromino] = useState(Forms[0]);
    const [postionY, setPostionY] = useState(-1);
    const [postionX, setPostionX] = useState(0);
    const [angleOfRotation, setAngleOfRotation] = useState<angles>(0);
    const [decaSeconds, setDecaSeconds] = useState(0);
    const [time, setTime] = useState('00:00');

    const [placed, setPlaced] = useState(false);

    function newCleanBoard(numRows: number, numColumns: number): newBoard[][] {
        const newBoard = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numColumns; j++) {
                row.push({ state: 0, Y: i, X: j });
            }
            newBoard.push(row);
        }
        return newBoard;
    }

    function shallowCopy(matrix: newBoard[][]): newBoard[][] {
        return JSON.parse(JSON.stringify(matrix));
    }

    const CLEANBOARD = newCleanBoard(20, 10);
    const [board, setBoard] = useState<newBoard[][]>(shallowCopy(CLEANBOARD));
    const [boardOfPlacedTetrominos, setBoardOfPlacedTetrominos] = useState<
        newBoard[][]
    >(shallowCopy(CLEANBOARD));
    const [highestY, setHighestY] = useState(0);
    const [didSettle, setDidSettle] = useState(false);

    // create a function to read if there is already a tetramino placed
    // if there is then stop the actual tetromino an copy it in it's actual coordinates and rotation but in the "boardOfPlacedTetrominos"
    // save the actual Y axis position and save it, then compare the next tetramino Y axis and so on
    // read from the highest Y stored to bottom and check if there is a row of ">=0";

    /* 
    function BoardInitializer(): void {
        const newBoard = CLEANBOARD
        setBoard(newBoard);
    }
 */

    function placeTetromino(): void {
        console.log('tetromino Placed');

        const newBoard = shallowCopy(boardOfPlacedTetrominos);
        actualTetromino.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    newBoard[postionY + i][postionX + j].state = cell;
                }
            });
        });
        setBoardOfPlacedTetrominos(newBoard);
    }
    function renderActualTetromino(): void {
        const newBoard = shallowCopy(CLEANBOARD);
        actualTetromino.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    newBoard[postionY + i][postionX + j].state = cell;
                }
            });
        });
        setBoard(newBoard);
    }
    function isCollidingOnBorder(direction: directions): boolean {
        function isLeftLimit(): boolean {
            let temp = false;
            for (let i = 0; i < 3; i++) {
                if (
                    board[postionY + i] === undefined ||
                    board[postionY + i][0].state >= 1
                ) {
                    temp = true;
                }
            }
            return temp;
        }
        function isRightLimit(): boolean {
            let temp = false;

            for (let i = 0; i < 3; i++) {
                if (
                    board[postionY + i] === undefined ||
                    board[postionY + i][board[0].length - 1].state >= 1
                ) {
                    temp = true;
                }
            }

            return temp;
        }
        function isDownLimit(): boolean {
            let temp = false;

            for (let i = 0; i < 3; i++) {
                if (
                    board[board.length - 1][postionX + i] !== undefined &&
                    board[board.length - 1][postionX + i].state >= 1
                )
                    temp = true;
            }

            return temp;
        }

        if (direction === 'left') return isLeftLimit() || isDownLimit();
        if (direction === 'right') return isRightLimit() || isDownLimit();
        if (direction === 'bottom') return isDownLimit();

        return true;
    }
    function handleTetrominoPosition(direction: directions): void {
        if (direction === 'left') {
            if (isCollidingOnBorder(direction)) return; // don't do anything
            setPostionX(postionX - 1);
        } // move to the LEFT
        if (direction === 'right') {
            if (isCollidingOnBorder(direction)) return; // don't do anything
            setPostionX(postionX + 1);
        } // move to the RIGHT
        if (direction === 'bottom') {
            if (isCollidingOnBorder(direction)) {
                setDidSettle(true);
                return;
            } // don't do anything

            setPostionY(postionY + 1);
        } // move DOWNWARDS
    }
    function rotateTetromino(angle: angles): void {
        if (angle === 0) return;

        let tempTetromino = actualTetromino;
        function moveAwayFrom(direction: directions): void {
            let keepSearching = true;
            let x = 0;

            if (direction === 'left') {
                while (keepSearching) {
                    for (let i = 0; i < actualTetromino.length; i++) {
                        if (actualTetromino[i][x] !== 0) {
                            keepSearching = false;
                            setPostionX(postionX + x);
                        }
                        if (i === actualTetromino.length - 1) x++;
                    }
                }
            }
            if (direction === 'right') {
                while (keepSearching) {
                    for (let i = 0; i < actualTetromino.length; i++) {
                        if (
                            actualTetromino[i][
                                actualTetromino.length - 1 - x
                            ] !== 0
                        ) {
                            keepSearching = false;
                            setPostionX(postionX + x * -1);
                        }
                        if (i === actualTetromino.length - 1) x++;
                    }
                }
            }
        }
        function rotateClockWise(): number[][] {
            return actualTetromino[0].map((val, index) =>
                actualTetromino.map((row) => row[index]).reverse()
            );
        }
        function rotateAntiClockWise(): number[][] {
            return actualTetromino[0]
                .map((val, index) => actualTetromino.map((row) => row[index]))
                .reverse();
        }

        // check collision
        if (isCollidingOnBorder('bottom')) return;
        if (isCollidingOnBorder('left')) moveAwayFrom('left');
        if (isCollidingOnBorder('right')) moveAwayFrom('right');

        // execute rotations
        if (angle === 90) tempTetromino = rotateClockWise();
        if (angle === -90) tempTetromino = rotateAntiClockWise();

        setActualTetromino(tempTetromino);
    }

    function parseTime(n: number): string {
        if (n < 10) {
            return `0${n}`;
        }
        return `${n}`;
    }

    function getRandomTetromino(): number[][] {
        const randomPosition = Math.floor(Math.random() * Forms.length);
        return Forms[randomPosition];
    }

    useEffect(() => {
        if (!placed) return;
        const initialTime = Date.now();
        const interval = setInterval(() => {
            const time = Math.floor((Date.now() - initialTime) / 1000);
            const sec = time % 60;
            const min = Math.floor(time / 60);

            setDecaSeconds(time);
            setTime(`${parseTime(min)}:${parseTime(sec)}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [placed]);

    // render the tetramino everytime the position changes
    useEffect(() => {
        if (!placed) return;
        renderActualTetromino();
    }, [postionX, postionY]);

    // render the tetramino everytime the angle changes
    useEffect(() => {
        if (!placed) return;
        rotateTetromino(angleOfRotation);
        renderActualTetromino();
        setAngleOfRotation(0);
    }, [angleOfRotation]);

    // render the board of placed Terominos everytime a new tetromino is settled
    useEffect(() => {
        if (!didSettle) return;
        placeTetromino();
        setPlaced(true);
        setPostionX(0);
        setPostionY(0);
        setDidSettle(false);
    }, [didSettle]);

    useEffect(() => {
        console.log('decaSeconds');
        handleTetrominoPosition('bottom');
    }, [decaSeconds]);

    return (
        <div className='tetris-wrapper'>
            <div className='tetris-display'>
                <div className='flex h-min w-full items-center justify-center bg-orange-500'>
                    <p className='text-4xl'>{time}</p>
                </div>
                <div className='tetris-board'>
                    {board.map((row, rowIndex) =>
                        row.map((square, columnIndex) => (
                            <Squares
                                key={columnIndex}
                                square={square}
                                square2={
                                    boardOfPlacedTetrominos[rowIndex][
                                        columnIndex
                                    ]
                                }
                            />
                        ))
                    )}
                </div>
            </div>
            {/* prettier-ignore */}
            <div className='flex w-full justify-around items-center' onClick={()=>{!placed&&setPlaced(true)}}>
                <button onClick={()=>{handleTetrominoPosition("left")}}>Left</button>
                <button onClick={()=>{handleTetrominoPosition("right")}}>Right</button>
                <button onClick={()=>{handleTetrominoPosition("bottom")}}>bottom</button>
                <button onClick={()=>{setAngleOfRotation(-90)}}>rotate-left</button>
                <button onClick={()=>{setAngleOfRotation(90)}}>rotate-right</button>
                <button onClick={() => renderActualTetromino()}>place</button>
            </div>
        </div>
    );
};
export default Tetris;
