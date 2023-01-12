import React, { useEffect, useState } from 'react';
import Squares from './Squares';
import './tetris.scss';

const Forms: Record<string, number[][]> = {
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

interface newBoard {
    state: number;
    Y: number;
    X: number;
}

type rotation = 1 | 0 | -1;

const Tetris: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { I, J, L, O, S, T, Z } = Forms;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [actualTetromino, setActualTetromino] = useState(I);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [postionY, setPostionY] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [postionX, setPostionX] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    type directions = 'left' | 'right' | 'down';
    function handleMovement(direction: directions): void {
        switch (direction) {
            case 'left':
                setPostionX(postionX - 1);

                break;
            case 'right':
                setPostionX(postionX + 1);
                break;
            case 'down':
                setPostionY(postionY + 1);

                break;

            default:
                break;
        }
    }
    function handleRotation(n: rotation): void {
        setRotation(n);
    }

    /*
    function handleRotate(): void {
        // Transpose and reverse the rows of the shape to rotate it 90 degrees
        const rotatedShape = actualTetromino[0].map((val, index) =>
            actualTetromino.map((row) => row[index]).reverse()
        );
        setActualTetromino(rotatedShape);
    } */

    useEffect(() => {
        if (!placed) return;
        placeTetromino();
    }, [postionX, postionY]);

    useEffect(() => {
        if (!placed) return;

        placeTetromino();
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
                <button onClick={()=>{handleRotation(1)}}>Rotate-left</button>
                <button onClick={()=>{handleRotation(-1)}}>Rotate-right</button>
                <button onClick={() => placeTetromino()}>place</button>
            </div>
        </>
    );
};
export default Tetris;
