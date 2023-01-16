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
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
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

type angles = 90 | 0 | -90;
type directions = 'left' | 'right' | 'bottom' | 'top';

const Tetris: React.FC = () => {
    function getRandomTetromino(): number[][] {
        const randomPosition = Math.floor(Math.random() * Forms.length);
        return Forms[randomPosition];
    }

    /* const [listOfTetrominos, setlistOfTetrominos] = useState<number[][][]>([
        getRandomTetromino(),
        getRandomTetromino(),
        getRandomTetromino(),
    ]); */

    const [actualTetromino, setActualTetromino] = useState(Forms[0]);
    const [positionY, setPositionY] = useState(0);
    const [positionX, setPositionX] = useState(0);
    const [angleOfRotation, setAngleOfRotation] = useState<angles>(0);
    const [decaSeconds, setDecaSeconds] = useState(0);
    const [time, setTime] = useState('00:00');

    const [placed, setPlaced] = useState(false);

    function newCleanBoard(numRows: number, numColumns: number): number[][] {
        const newBoard = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numColumns; j++) {
                row.push(0);
            }
            newBoard.push(row);
        }
        return newBoard;
    }

    function shallowCopy(matrix: number[][]): number[][] {
        return JSON.parse(JSON.stringify(matrix));
    }

    const CLEANBOARD = newCleanBoard(20, 10);
    const [board, setBoard] = useState<number[][]>(shallowCopy(CLEANBOARD));
    const [boardOfPlacedTetrominos, setBoardOfPlacedTetrominos] = useState<
        number[][]
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
        const newBoard = shallowCopy(boardOfPlacedTetrominos);
        actualTetromino.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    newBoard[positionY + i][positionX + j] = cell;
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
                    newBoard[positionY + i][positionX + j] = cell;
                }
            });
        });
        setBoard(newBoard);
    }

    function Overlapping(
        direction: directions,
        tempTetromino: number[][],
        positionY: number,
        positionX: number
    ): number {
        // bottom case
        let unavailables = 0;

        function isOverlapping(
            i: number,
            j: number,
            axis: 'columns' | 'rows'
        ): boolean {
            let Y = 0;
            let X = 0;
            if (axis === 'rows') {
                X += j;
                Y += i;
            }
            if (axis === 'columns') {
                X += i;
                Y += j;
            }
            const boardX = positionX + X;
            const boardY = positionY + Y;

            const isUndefined =
                boardOfPlacedTetrominos[boardY] === undefined ||
                boardOfPlacedTetrominos[boardY][boardX] === undefined;
            const isOverlap =
                (isUndefined ||
                    boardOfPlacedTetrominos[boardY][boardX] !== 0) &&
                tempTetromino[Y][X] !== 0;

            if (isOverlap) {
                return true;
            }

            return false;
        }

        function search(
            axis: 'columns' | 'rows',
            startFrom: 'FromLast' | 'FromFirst'
        ): number {
            let unavailables = 0;

            if (startFrom === 'FromFirst') {
                for (let i = 0; i < tempTetromino.length; i++) {
                    let matrixesOverlapping = 0;
                    for (let j = 0; j < tempTetromino.length; j++) {
                        if (isOverlapping(i, j, axis)) matrixesOverlapping++;
                    }
                    if (matrixesOverlapping > 0) unavailables++;
                }
            }
            if (startFrom === 'FromLast') {
                for (let i = tempTetromino.length - 1; i >= 0; i--) {
                    let matrixesOverlapping = 0;
                    for (let j = 0; j < tempTetromino.length; j++) {
                        if (isOverlapping(i, j, axis)) matrixesOverlapping++;
                    }
                    if (matrixesOverlapping > 0) unavailables++;
                }
            }
            return unavailables;
        }

        if (direction === 'top') unavailables = search('rows', 'FromFirst');
        if (direction === 'bottom') unavailables = search('rows', 'FromLast');
        if (direction === 'left') unavailables = search('columns', 'FromFirst');
        if (direction === 'right') unavailables = search('columns', 'FromLast');

        return unavailables;
    }

    // prettier-ignore

    function handleTetrominoPosition(direction: directions): void {
        let tempPositionX = positionX;
        let tempPositionY = positionY;

        if (direction==='left')  tempPositionX--;
        if (direction==='right') tempPositionX++;
        if (direction==='bottom') tempPositionY++;

        const willCollide = Overlapping(direction,actualTetromino,tempPositionY,tempPositionX)>0; 
        
        if (direction === 'bottom' && willCollide) {
            setDidSettle(true);
            return;
        } 
        if (willCollide) return;
        
        setPositionX(tempPositionX);
        setPositionY(tempPositionY);

        // move DOWNWARDS
    }
    function rotateTetromino(angle: angles): void {
        if (angle === 0) return;
        let tempTetromino = shallowCopy(actualTetromino);
        let tempPositionX = positionX;
        let tempPositionY = positionY;

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

        // execute rotations
        if (angle === 90) tempTetromino = rotateClockWise();
        if (angle === -90) tempTetromino = rotateAntiClockWise();

        const numberOfOverlappingFromLeft=Overlapping('left',tempTetromino,positionY,positionX) // prettier-ignore
        const numberOfOverlappingFromRight=Overlapping('right',tempTetromino,positionY,positionX) // prettier-ignore
        const numberOfOverlappingFromBottom=Overlapping('bottom',tempTetromino,positionY,positionX) // prettier-ignore

        // check collision
        if (numberOfOverlappingFromBottom>0) tempPositionY -= numberOfOverlappingFromBottom; // prettier-ignore
        if (numberOfOverlappingFromRight>0) tempPositionX -= numberOfOverlappingFromRight; // prettier-ignore
        if (numberOfOverlappingFromLeft>0) tempPositionX += numberOfOverlappingFromLeft; // prettier-ignore
        console.log({
            numberOfOverlappingFromRight,
            numberOfOverlappingFromLeft,
        });

        if (numberOfOverlappingFromRight > 0 && numberOfOverlappingFromLeft > 0)
            return;

        setActualTetromino(tempTetromino);
        setPositionX(tempPositionX);
        setPositionY(tempPositionY);
    }

    function parseTime(n: number): string {
        if (n < 10) {
            return `0${n}`;
        }
        return `${n}`;
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
    }, [positionX, positionY]);

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
        setPositionX(0);
        setPositionY(0);

        setDidSettle(false);
    }, [didSettle]);

    useEffect(() => {
        /*  handleTetrominoPosition('bottom'); */
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
