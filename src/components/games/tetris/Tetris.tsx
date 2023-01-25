import React, { useEffect, useState } from 'react';
import NextTetromino from './NextTetromino';
import Squares from './Squares';
import './tetris.scss';

type angles = 90 | 0 | -90;
type directions = 'left' | 'right' | 'bottom' | 'top';
type formsNames = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

type Form = [formsNames, number[][]];
const Forms: Form[] = [
    [
        'I',
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
    ],
    [
        'J',
        [
            [0, 2, 2],
            [0, 2, 0],
            [0, 2, 0],
        ],
    ],
    [
        'L',
        [
            [3, 3, 0],
            [0, 3, 0],
            [0, 3, 0],
        ],
    ],
    [
        'O',
        [
            [4, 4],
            [4, 4],
        ],
    ],
    [
        'S',
        [
            [0, 5, 0],
            [0, 5, 5],
            [0, 0, 5],
        ],
    ],
    [
        'T',
        [
            [0, 0, 0],
            [6, 6, 6],
            [0, 6, 0],
        ],
    ],
    [
        'Z',
        [
            [0, 0, 7],
            [0, 7, 7],
            [0, 7, 0],
        ],
    ],
];

const Tetris: React.FC = () => {
    function shallowCopy(matrix: number[][]): number[][] {
        return JSON.parse(JSON.stringify(matrix));
    }
    function getRandomTetromino(): Form {
        const randomPosition = Math.floor(Math.random() * Forms.length);
        return Forms[randomPosition];
    }
    const [listOfTetrominos, setlistOfTetrominos] = useState<Form[]>([
        getRandomTetromino(),
        getRandomTetromino(),
        getRandomTetromino(),
        getRandomTetromino(),
    ]);

    function shiftAndPushTetromino(listOfTetrominos: Form[]): Form[] {
        listOfTetrominos.shift();
        listOfTetrominos.push(getRandomTetromino());
        return listOfTetrominos;
    }

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
    const CLEANBOARD = newCleanBoard(25, 10);

    const [decaSeconds, setDecaSeconds] = useState(0);
    const [time, setTime] = useState('00:00');

    const [actualTetromino, setActualTetromino] = useState(
        listOfTetrominos[0][1]
    );
    const [positionY, setPositionY] = useState(1);
    const [positionX, setPositionX] = useState(3);
    const [angleOfRotation, setAngleOfRotation] = useState<angles>(0);
    const [placed, setPlaced] = useState(false);
    const [didSettle, setDidSettle] = useState(false);
    const [board, setBoard] = useState<number[][]>(shallowCopy(CLEANBOARD));
    const [boardOfPlacedTetrominos, setBoardOfPlacedTetrominos] = useState<number[][]>(shallowCopy(CLEANBOARD)); // prettier-ignore
    const [isFalling, setIsFalling] = useState(false);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'In-game' | 'loss' | 'paused'>(
        'paused'
    );
    const [keyPressed, setKeyPressed] = useState('released');

    function TEST(
        matix: number[][],
        score: number
    ): { UpdatedMatrix: number[][]; updatedScore: number; didLoss: boolean } {
        const tempMatrix = shallowCopy(matix);
        let LowestY = tempMatrix.length;
        let tempScore = score;

        function iterateMatrixTopToBottom(
            tempMatrix: number[][],
            CLEANBOARD: number[][]
        ): {
            fullRows: number[];
            cleanedRowsMatrix: number[][];
            didLoss: boolean;
        } {
            let didLoss = false;

            const fullRows: number[] = [];
            for (let y = 0; y < tempMatrix.length; y++) {
                let fullRow = true;
                for (let x = 0; x < tempMatrix[y].length; x++) {
                    if (tempMatrix[y][x] === 0) {
                        fullRow = false;
                    }
                    if (y <= 5 && tempMatrix[y][x] !== 0) {
                        didLoss = true;
                        break;
                    }
                }

                if (fullRow) {
                    tempScore += board[0].length;
                    tempMatrix[y] = CLEANBOARD[0];
                    fullRows.push(y);
                }
            }
            return { fullRows, cleanedRowsMatrix: tempMatrix, didLoss };
        }

        const { fullRows, cleanedRowsMatrix, didLoss } =
            iterateMatrixTopToBottom(tempMatrix, CLEANBOARD);

        LowestY = fullRows[fullRows.length - 1];

        function iterateMatrixBottomToTop(Matrix: number[][]): number[][] {
            let consecutiveZeroRows = 0;
            let lastZeroRow = -1;
            const arrayOfPositionsAndDistances: number[][] = [];
            for (let y = LowestY; y >= 0; y--) {
                let fullRow = true;
                for (let x = 0; x < tempMatrix[y].length; x++) {
                    if (tempMatrix[y][x] !== 0) {
                        fullRow = false;
                    }
                }
                if (!fullRow && consecutiveZeroRows !== 0) {
                    arrayOfPositionsAndDistances.push([
                        lastZeroRow,
                        consecutiveZeroRows,
                    ]);
                    consecutiveZeroRows = 0;
                    continue;
                }
                if (fullRow) {
                    consecutiveZeroRows++;
                    lastZeroRow = y;
                }
            }

            let bruh = 0;
            shallowCopy(arrayOfPositionsAndDistances)
                .reverse()
                .forEach((element) => {
                    if (element.length === 0) return;
                    tempScore = score;
                    for (let i = element[0] - 1; i >= 0; i--) {
                        Matrix[i + element[1]] = Matrix[i];
                    }
                    bruh += element[1];
                });
            if (bruh > 0) tempScore += bruh * bruh * Matrix[0].length;
            return Matrix;
        }

        const UpdatedMatrix = iterateMatrixBottomToTop(cleanedRowsMatrix);

        return { UpdatedMatrix, updatedScore: tempScore, didLoss };
    }

    function UpdatedBoardOfPLacedTetrominos(): number[][] {
        const newBoard = shallowCopy(boardOfPlacedTetrominos);
        actualTetromino.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    newBoard[positionY + i][positionX + j] = cell;
                }
            });
        });
        return newBoard;
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

    interface IonRotateCollitions {
        linesColliding: number;
        sectionColliding: 'FirstHalf' | 'LastHalf' | 'none';
        isColliding: boolean;
    }
    function onMoveCollitions(
        axis: 'columns' | 'rows',
        tempTetromino: number[][],
        positionY: number,
        positionX: number
    ): boolean {
        let linesColliding = 0;
        let isColliding = false;

        for (let i = 0; i < tempTetromino.length; i++) {
            let matrixesOverlapping = 0;
            for (let j = 0; j < tempTetromino.length; j++) {
                const Y = axis === 'rows' ? i : j;
                const X = axis === 'rows' ? j : i;
                const isUndefined =
                    boardOfPlacedTetrominos[positionY + Y] === undefined ||
                    boardOfPlacedTetrominos[positionY + Y][positionX + X] ===
                        undefined;
                const isOverlap =
                    (isUndefined ||
                        boardOfPlacedTetrominos[positionY + Y][
                            positionX + X
                        ] !== 0) &&
                    tempTetromino[Y][X] !== 0;

                if (isOverlap) {
                    /* if (i < firstHalf) firstHalfColliding++;
                    if (i > firstHalf) lastHalfColliding++; */
                    matrixesOverlapping++;
                }
            }
            if (matrixesOverlapping > 0) linesColliding++;
            if (linesColliding > 0) isColliding = true;
        }
        /* if (firstHalfColliding > lastHalfColliding)sectionColliding = 'FirstHalf'; 
        if (firstHalfColliding < lastHalfColliding)sectionColliding = 'LastHalf';  */

        return isColliding;
    }
    function onRotateCollitions(
        axis: 'columns' | 'rows',
        tempTetromino: number[][],
        positionY: number,
        positionX: number
    ): IonRotateCollitions {
        // bottom case
        let linesColliding = 0;
        let isColliding = false;
        let sectionColliding: IonRotateCollitions['sectionColliding'] = 'none';
        let DistanceFromCollision = 0;

        interface collisionINFO {
            matrixesOverlapping: number;
            onesInTetromino: number;
            isHalfColliding: boolean;
        }

        function internalBucle(i: number): collisionINFO {
            let matrixesOverlapping = 0;
            let onesInTetromino = 0;
            let isHalfColliding = false;

            for (let j = 0; j < tempTetromino.length; j++) {
                const Y = axis === 'rows' ? i : j;
                const X = axis === 'rows' ? j : i;
                const isUndefined =
                    boardOfPlacedTetrominos[positionY + Y] === undefined ||
                    boardOfPlacedTetrominos[positionY + Y][positionX + X] ===
                        undefined;
                const isOverlap =
                    (isUndefined ||
                        boardOfPlacedTetrominos[positionY + Y][
                            positionX + X
                        ] !== 0) &&
                    tempTetromino[Y][X] !== 0;

                if (tempTetromino[Y][X] !== 0) onesInTetromino++;
                if (isOverlap) {
                    isHalfColliding = true;
                    matrixesOverlapping++;
                }
            }

            return { matrixesOverlapping, onesInTetromino, isHalfColliding };
        }

        // first half
        for (let i = 0; i < (tempTetromino.length - 1) / 2; i++) {
            const { isHalfColliding, matrixesOverlapping, onesInTetromino } =
                internalBucle(i);
            if (isHalfColliding) sectionColliding = 'FirstHalf';
            if (matrixesOverlapping > 0) linesColliding++;
            if (linesColliding > 0) isColliding = true;
            if (onesInTetromino > 0 && !isColliding) DistanceFromCollision++;
        }
        if (!isColliding) DistanceFromCollision = 0;

        // last half
        // prettier-ignore
        for (let i = tempTetromino.length - 1;i > (tempTetromino.length - 1) / 2;i--) {
            const { isHalfColliding, matrixesOverlapping, onesInTetromino } =
                internalBucle(i);
            if (isHalfColliding) sectionColliding = 'LastHalf';
            if (matrixesOverlapping > 0) linesColliding++;
            if (linesColliding > 0) isColliding = true;
            if (onesInTetromino > 0 && !isColliding) DistanceFromCollision++;
        }

        if (!isColliding) DistanceFromCollision = 0;

        linesColliding =
            linesColliding >= DistanceFromCollision
                ? linesColliding
                : DistanceFromCollision;

        return { linesColliding, sectionColliding, isColliding };
    }

    type orientation = 'vertical' | 'horizontal';
    function tetrominoOrientation(tetromino: number[][]): orientation {
        let temp = 0;
        for (let i = 0; i < tetromino.length; i++) {
            let temp2 = 0;
            for (let j = 0; j < tetromino.length; j++) {
                if (tetromino[i][j] > 0) temp2++;
            }
            if (temp2 > 0) temp++;
        }

        if (temp === tetromino.length) return 'vertical';

        return 'horizontal';
    }

    // prettier-ignore
    function handleTetrominoPosition(direction: directions): void {
        let tempPositionX = positionX;
        let tempPositionY = positionY;

        if (direction==='left')  tempPositionX--;
        if (direction==='right') tempPositionX++;
        if (direction==='bottom') tempPositionY++;

        const isColliding = onMoveCollitions("columns",actualTetromino,tempPositionY,tempPositionX); 
        
        if (isColliding){
            if (direction==='bottom') setDidSettle(true);
            return
        }
        
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

        const columns = onRotateCollitions(
            'columns',
            tempTetromino,
            tempPositionY,
            tempPositionX
        );
        const rows = onRotateCollitions(
            'rows',
            tempTetromino,
            tempPositionY,
            tempPositionX
        );

        let isCollidingLeft = false;
        let isCollidingRight = false;
        let isCollidingBottom = false;

        if (tetrominoOrientation(actualTetromino) === 'vertical') {
            isCollidingLeft = columns.sectionColliding === 'FirstHalf';
            isCollidingRight = columns.sectionColliding === 'LastHalf';
        }
        if (tetrominoOrientation(actualTetromino) === 'horizontal') {
            isCollidingBottom = rows.sectionColliding === 'LastHalf';
        }

        // check collision
        if (isCollidingLeft) tempPositionX += columns.linesColliding;
        if (isCollidingRight) tempPositionX -= columns.linesColliding;
        if (isCollidingBottom) tempPositionY -= rows.linesColliding; // prettier-ignore
        if (isCollidingLeft && isCollidingRight) return;

        // check collision in the new position
        const isCollidingX = onMoveCollitions(
            'columns',
            tempTetromino,
            tempPositionY,
            tempPositionX
        );
        const isCollidingY = onMoveCollitions(
            'rows',
            tempTetromino,
            tempPositionY,
            tempPositionX
        );

        if (isCollidingX || isCollidingY) return;

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

    function restart(): void {
        setScore(0);
        setTime('00:00');
        setBoard(CLEANBOARD);
        setBoardOfPlacedTetrominos(CLEANBOARD);
        setPlaced(true);
        setIsFalling(false);
        setDidSettle(false);
        setPositionX(3);
        setPositionY(-1);
        setGameState('In-game');
        setlistOfTetrominos([
            getRandomTetromino(),
            getRandomTetromino(),
            getRandomTetromino(),
            getRandomTetromino(),
        ]);
    }

    // start the timer when first tetromino is placed
    useEffect(() => {
        if (gameState !== 'In-game') return;
        if (!placed) return;
        if (!isFalling) setIsFalling(true);
        const initialTime = Date.now();
        const interval = setInterval(() => {
            const time = Math.floor((Date.now() - initialTime) / 1000);
            const sec = time % 60;
            const min = Math.floor(time / 60);

            setDecaSeconds(time);
            setTime(`${parseTime(min)}:${parseTime(sec)}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [placed, gameState]);
    // render the tetramino everytime the position changes
    useEffect(() => {
        if (!placed || !isFalling) return;
        renderActualTetromino();
    }, [positionX, positionY]);
    // render the tetramino everytime the angle changes
    useEffect(() => {
        if (gameState !== 'In-game') return;
        if (!placed) return;
        if (!isFalling) return;
        rotateTetromino(angleOfRotation);
        renderActualTetromino();
        setAngleOfRotation(0);
    }, [angleOfRotation]);
    // render the board of placed Terominos everytime a new tetromino is settled
    useEffect(() => {
        if (gameState !== 'In-game') return;

        if (!didSettle) return;
        const { didLoss, UpdatedMatrix, updatedScore } = TEST(
            UpdatedBoardOfPLacedTetrominos(),
            score
        );
        setGameState(didLoss ? 'loss' : 'In-game');
        setBoardOfPlacedTetrominos([...UpdatedMatrix]);
        setScore(updatedScore);
        setlistOfTetrominos([...shiftAndPushTetromino(listOfTetrominos)]);
        setPlaced(true);
        setPositionX(3);
        setPositionY(0);
        setDidSettle(false);
        setIsFalling(false);
    }, [didSettle]);
    // push tetromino downwards everySecond
    useEffect(() => {
        if (gameState !== 'In-game') return;

        if (decaSeconds > 0) handleTetrominoPosition('bottom');
    }, [decaSeconds]);

    useEffect(() => {
        if (gameState !== 'In-game') return;

        setActualTetromino([...listOfTetrominos[0][1]]);
    }, [listOfTetrominos]);

    useEffect(() => {
        if (gameState !== 'In-game') return;

        if (!isFalling) handleTetrominoPosition('bottom');
        setIsFalling(true);
    }, [actualTetromino]);

    useEffect(() => {
        if (gameState !== 'loss') return;
        console.log('lost');
    }, [gameState]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            removeEventListener('keydown', handleKeyDown);
            removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        switch (keyPressed) {
            case 'q':
                setAngleOfRotation(-90);
                break;
            case 'e':
                setAngleOfRotation(90);
                break;
            case 's':
                handleTetrominoPosition('bottom');
                break;
            case 'a':
                handleTetrominoPosition('left');
                break;
            case 'd':
                handleTetrominoPosition('right');
                break;
            default:
                break;
        }
        setKeyPressed('released');
    }, [keyPressed]);

    function handleKeyDown(e: KeyboardEvent): void {
        setKeyPressed(e.key);
    }

    function handleKeyUp(): void {
        //
    }

    return (
        <div className='h-full w-full'>
            <div className='tetris-wrapper'>
                <div className='tetris-display'>
                    <div className='left-side flex h-full w-full flex-col items-center'>
                        <div className='w-full'>
                            <div className='flex h-min w-full items-center justify-center bg-orange-500'>
                                <p className='text-4xl'>{time}</p>
                            </div>
                            <div className='flex h-min w-full items-center justify-center bg-indigo-500'>
                                <p className='text-4xl'>{score}</p>
                            </div>
                        </div>
                        <div className='controls-wrapper w-full place-self-center'>
                            <div className='controls'>
                                <button
                                    className='key'
                                    onClick={() => {
                                        handleTetrominoPosition('left');
                                    }}
                                >
                                    <p>A</p>
                                </button>

                                <button
                                    className='key'
                                    onClick={() => {
                                        handleTetrominoPosition('right');
                                    }}
                                >
                                    D
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            setPlaced(true);
                            setGameState('In-game');
                            if (gameState === 'loss') restart();
                        }}
                        className='tetris-board relative'
                    >
                        {board.map(
                            (row, rowIndex) =>
                                rowIndex > 4 &&
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
                        {gameState !== 'In-game' && (
                            <div
                                className={`absolute top-1/2 flex h-36 w-full -translate-y-1/2 items-center justify-center  ${
                                    gameState === 'loss'
                                        ? 'bg-red-700'
                                        : 'bg-green-600'
                                }`}
                            >
                                <p className='text-8xl'>
                                    {gameState === 'loss'
                                        ? 'Game Over'
                                        : 'Press To Start'}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className='right-side tetrominoList flex w-full flex-col justify-self-center'>
                        <div className='w-1/2'>
                            {listOfTetrominos.map(
                                (e, i) =>
                                    i !== 0 && (
                                        <NextTetromino key={i} tetromino={e} />
                                    )
                            )}
                        </div>
                        <div className='controls-wrapper flex w-full items-center justify-center'>
                            <div className='controls flex justify-around'>
                                <button
                                    className='key'
                                    onClick={() => {
                                        setAngleOfRotation(-90);
                                    }}
                                >
                                    <p>Q</p>
                                </button>
                                <button
                                    className='key'
                                    onClick={() => {
                                        setAngleOfRotation(90);
                                    }}
                                >
                                    <p>E</p>
                                </button>
                            </div>
                        </div>
                        <div className='controls-wrapper flex w-full items-center justify-center'>
                            <div className='controls flex justify-around'>
                                <button
                                    className='key'
                                    onClick={() => {
                                        handleTetrominoPosition('bottom');
                                    }}
                                >
                                    S
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Tetris;
