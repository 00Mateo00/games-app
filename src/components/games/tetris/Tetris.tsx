import React, { useEffect, useState } from 'react';
import Squares from './Squares';
import './tetris.scss';

const Forms: Record<string, number[][]> = {
    TEST: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ],
    ILarge: [
        [0, 3, 0, 0],
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
};

interface newBoard {
    state: number;
    Y: number;
    X: number;
}

type rotation = 90 | 0 | -90;
type directions = 'left' | 'right' | 'down';

const Tetris: React.FC = () => {
    const { ILarge } = Forms;
    const [actualTetromino, setActualTetromino] = useState(ILarge);
    const [postionY, setPostionY] = useState(0);
    const [postionX, setPostionX] = useState(0);
    const [rotation, setRotation] = useState<rotation>(0);

    const [placed, setPlaced] = useState(false);

    function CleanBoard(numRows: number, numColumns: number): newBoard[][] {
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

    const CLEANBOARD = CleanBoard(20, 10);
    const [board, setBoard] = useState<newBoard[][]>(CLEANBOARD);

    /* 
    function BoardInitializer(): void {
        const newBoard = CLEANBOARD
        setBoard(newBoard);
    }
 */
    function placeTetromino(): void {
        const newBoard = CLEANBOARD;
        actualTetromino.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    newBoard[postionY + i][postionX + j].state = cell;
                }
            });
        });
        setBoard(newBoard);
    }
    function canNotMoveTo(direction: directions): boolean {
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
        if (direction === 'down') return isDownLimit();

        return true;
    }

    function handleMovement(direction: directions): void {
        if (canNotMoveTo(direction)) return; // don't do anything
        if (direction === 'left') setPostionX(postionX - 1); // move to the LEFT
        if (direction === 'right') setPostionX(postionX + 1); // move to the RIGHT
        if (direction === 'down') setPostionY(postionY + 1); // move DOWNWARDS
    }
    function handleRotation(n: rotation): void {
        setRotation(n);
    }
    function handleRotate(n: rotation): void {
        let rotatedTetromino = actualTetromino;
        function countBlankSpaces(): number {
            let x = 0;
            let isColumnEmpty = true;

            while (isColumnEmpty && x < 10) {
                for (let y = 0; y < actualTetromino.length; y++) {
                    if (actualTetromino[y][x] >= 1) isColumnEmpty = false;
                }
                x++;
            }
            console.log(x);
            return x;
        }
        if (canNotMoveTo('left')) {
            setPostionX(postionX + countBlankSpaces());
        }
        // Transpose and then reverse the rows of the shape to rotate it 90 degrees
        if (n === 90) {
            rotatedTetromino = actualTetromino[0].map((val, index) =>
                actualTetromino.map((row) => row[index]).reverse()
            );
        }
        // reverse and then Transpose the rows of the shape to rotate it -90 degrees
        if (n === -90) {
            rotatedTetromino = actualTetromino[0].map((val, index) =>
                actualTetromino.map((row) => row.reverse()[index])
            );
        }

        setActualTetromino(rotatedTetromino);
    }

    useEffect(() => {
        if (!placed) return;
        placeTetromino();
    }, [postionX, postionY]);

    useEffect(() => {
        if (!placed) return;
        handleRotate(rotation);
        placeTetromino();
        setRotation(0);
    }, [rotation]);

    return (
        <>
            <div className='tetris-board'>
                {board.map((row) =>
                    row.map((square, columnIndex) => (
                        <Squares key={columnIndex} square={square} />
                    ))
                )}
            </div>
            {/* prettier-ignore */}
            <div className='flex w-full justify-around items-center' onClick={()=>{!placed&&setPlaced(true)}}>
                <button onClick={()=>{handleMovement("left")}}>Left</button>
                <button onClick={()=>{handleMovement("right")}}>Right</button>
                <button onClick={()=>{handleMovement("down")}}>down</button>
                <button onClick={()=>{handleRotation(-90)}}>rotate-left</button>
                <button onClick={()=>{handleRotation(90)}}>rotate-right</button>
                <button onClick={() => placeTetromino()}>place</button>
            </div>
        </>
    );
};
export default Tetris;
