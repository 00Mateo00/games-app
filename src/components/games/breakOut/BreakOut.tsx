/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import Bricks from './Bricks';
import Life from './Life';
import Paddle from './Paddle';

type Difficulty = 'easy' | 'medium' | 'hard';
type Region = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type GameState = 'in-game' | 'paused' | 'loss' | 'won';

const BreakOut: React.FC = () => {
    const speed = 2;
    const ballSize = 12;
    const rows = 11;
    const columns = 11;

    function deepCopy2DArray(arr: number[][][]): number[][][] {
        return JSON.parse(JSON.stringify(arr));
    }
    function deepCopy2DArray2(arr: number[][]): number[][] {
        return JSON.parse(JSON.stringify(arr));
    }
    function fillBoardOfStates(): number[][] {
        let colorNumber = 1;
        const tempMatrix: number[][] = [];
        for (let i = 0; i < rows; i++) {
            tempMatrix.push([]);
            for (let j = 0; j < columns; j++) {
                tempMatrix[i].push(colorNumber);
            }
            if (i !== 0 && i % 2 === 0) colorNumber++;
        }
        return tempMatrix;
    }

    const [boardOfStates, setBoardOfStates] = useState<number[][]>(
        fillBoardOfStates()
    );
    const [boardOfPositions, setBoardOfPositions] = useState<number[][][]>(
        new Array(rows).fill(new Array(columns).fill([0, 0]))
    );
    const [ballX, setBallX] = useState(920);
    const [ballY, setBallY] = useState(280);
    const [accelerationY, setAccelerationY] = useState(speed);
    const [accelerationX, setAccelerationX] = useState(speed);
    const [gameState, setGameState] = useState<GameState>('paused');
    const [keyPressed, setkeyPressed] = useState('none');
    const [brickWidth, setBrickWidth] = useState(0);
    const [brickHeight, setBrickHeight] = useState(0);
    const [decaSeconds, setDecaSeconds] = useState(0);
    const [difficulty, setDifficulty] = useState<Difficulty>('hard');
    const [paddleWidth, setpaddleWidth] = useState(0);
    const [life, setLife] = useState(3);
    const [score, setScore] = useState(0);

    const gridRef = useRef<HTMLDivElement>(null);
    const boardRef = useRef<HTMLDivElement>(null);
    const [paddleX, setPaddleX] = useState(0);

    function handlekey(e: KeyboardEvent): void {
        setkeyPressed(e.key.toLocaleLowerCase());
    }

    function search(
        matrix: number[][][],
        direction: Region
    ): {
        isColliding: boolean;
        x: number;
        y: number;
        axisOfcollision: 'Y' | 'X' | 'none';
    } {
        function search(
            StartY: number,
            EndY: number,
            StartX: number,
            EndX: number
        ): {
            isColliding: boolean;
            y: number;
            x: number;
            axisOfcollision: 'Y' | 'X' | 'none';
        } {
            // dsadsa
            for (let i = StartY; i < EndY; i++) {
                for (let j = StartX; j < EndX; j++) {
                    if (boardOfStates[i][j] === 0) continue;
                    const brickYSTART = matrix[i][j][0];
                    const brickYEND = matrix[i][j][0] + brickHeight;
                    const brickXSTART = matrix[i][j][1];
                    const brickXEND = matrix[i][j][1] + brickWidth;
                    const BrickYCollisionBoxStart = brickYSTART - 6;
                    const BrickYCollisionBoxEND = brickYEND + 6;
                    // collisions top-left
                    if (
                        ballY >= brickYSTART &&
                        ballY <= brickYEND &&
                        ballX >= brickXSTART &&
                        ballX <= brickXEND
                    ) {
                        
                        if (
                            ballY <= BrickYCollisionBoxEND &&
                            ballY >= brickYEND &&
                            ballX >= brickXSTART &&
                            ballX <= brickXEND
                        ) {
                            console.log(`ballY: ${ballY}`);
                            console.log(`brickYCollisionBoxEnd: ${BrickYCollisionBoxEND}`);
                            console.log(`brickYend: ${brickYEND}`);
                            console.log(`brickXstart: ${brickXSTART}`);
                            console.log(`brickXend: ${brickXEND}`);
                            
                            console.log("is colliding Y");
                            return {
                                isColliding: true,
                                y: i,
                                x: j,
                                axisOfcollision: 'Y',
                            };
                        } else {
                            console.log("------------------------------");
                            
                            console.log(`ballY: ${ballY}`);
                            console.log(`brickYCollisionBoxEnd: ${BrickYCollisionBoxEND}`);
                            console.log(`brickYend: ${brickYEND}`);
                            console.log(`brickXstart: ${brickXSTART}`);
                            console.log(`brickXend: ${brickXEND}`);
                            console.log("is colliding X");

                            return {
                                isColliding: true,
                                y: i,
                                x: j,
                                axisOfcollision: 'X',
                            };
                        }
                    }
                    // collisions bottom-right
                    if (
                        ballY + ballSize >= brickYSTART &&
                        ballY + ballSize <= brickYEND &&
                        ballX + ballSize >= brickXSTART &&
                        ballX + ballSize <= brickXEND
                    ) {
                        if (
                            ballY + ballSize >= BrickYCollisionBoxStart &&
                            ballY + ballSize <= brickYSTART &&
                            ballX >= brickXSTART &&
                            ballX <= brickXEND
                        ) {
                            console.log("is colliding Y");
                            
                            return {
                                isColliding: true,
                                y: i,
                                x: j,
                                axisOfcollision: 'Y',
                            };
                        } else {
                            console.log("is colliding X");
                            return {
                                isColliding: true,
                                y: i,
                                x: j,
                                axisOfcollision: 'X',
                            };
                        }
                    }
                }
            }
            return {
                isColliding: false,
                y: -1,
                x: -1,
                axisOfcollision: 'none',
            };
        }

        const start = 0;
        const columnsHalf = Math.round(matrix.length / 2);
        const rowsHalf = Math.round(matrix[0].length / 2);
        const rowsEnd = matrix[0].length;
        const columnsEnd = matrix.length;

        if (direction === 'top-left')
            return search(start, columnsHalf, start, rowsHalf);
        if (direction === 'top-right')
            return search(start, columnsHalf, rowsHalf, rowsEnd);
        if (direction === 'bottom-left')
            return search(columnsHalf, columnsEnd, start, rowsHalf);
        if (direction === 'bottom-right')
            return search(columnsHalf, columnsEnd, rowsHalf, rowsEnd);
        return { isColliding: false, x: 0, y: 0, axisOfcollision: 'none' };
    }

    useEffect(() => {
        if (gameState !== 'in-game') return;

        if (boardRef.current != null) {
            const tempPaddleWidth = Math.round(
                boardRef.current.clientWidth * 0.16
            );
            setPaddleX(
                boardRef.current.clientWidth / 2 -
                    Math.round(tempPaddleWidth / 2)
            );

            setBallX(
                boardRef.current.clientWidth / 2 - Math.round(ballSize / 2)
            );
            setBallY(boardRef.current.clientHeight - ballSize - 50);
            setpaddleWidth(tempPaddleWidth);
        }

        if (gridRef.current !== null) {
            const tempBoardOfPositions = deepCopy2DArray(boardOfPositions);
            const brickWidth = gridRef.current?.children[0].clientWidth + 4;
            const brickHeight = gridRef.current?.children[0].clientHeight + 4;
            setBrickWidth(brickWidth);
            setBrickHeight(brickHeight);

            let Y = 0;
            for (let y = 0; y < boardOfPositions.length; y++) {
                let X = 0;
                for (let x = 0; x < boardOfPositions[0].length; x++) {
                    tempBoardOfPositions[y][x][0] = Y;
                    tempBoardOfPositions[y][x][1] = X;
                    X += brickWidth;
                }
                Y += brickHeight;
            }
            setBoardOfPositions(tempBoardOfPositions);
        }

        /* const initialTime = Date.now();
        const interval = setInterval(() => {
            const time = Math.floor(Date.now() - initialTime) / 10;
            setDecaSeconds(time);
        }, 10);

        return () => clearInterval(interval); */
    }, [gameState]);
    useEffect(() => {
        let tempAcceleartionY = accelerationY;
        let tempAcceleartionX = accelerationX;

        if (gridRef.current !== null) {
            const gridWidth = gridRef.current.clientWidth;
            const gridHeight = gridRef.current.clientHeight;
            if (ballY - 2 < gridHeight + brickHeight) {
                const isLeft = ballX < gridWidth / 2 + brickWidth;
                const isRight = ballX >= gridWidth / 2 - brickWidth;
                const isTop = ballY < gridHeight / 2 + brickHeight;
                const isBottom = ballY >= gridHeight / 2 - brickHeight;

                if (isTop && isLeft) {
                    const { isColliding, x, y, axisOfcollision } = search(
                        boardOfPositions,
                        'top-left'
                    );

                    const tempBoardOfStates = deepCopy2DArray2(boardOfStates);
                    if (isColliding) {
                        setScore(score + 10);
                        tempBoardOfStates[y][x] = 0;
                        setBoardOfStates(tempBoardOfStates);
                        if (axisOfcollision === 'X') {
                            tempAcceleartionX = tempAcceleartionX * -1;
                            setAccelerationX(tempAcceleartionX);
                        } else {
                            tempAcceleartionY = tempAcceleartionY * -1;
                            setAccelerationY(tempAcceleartionY);
                        }
                    }
                }
                if (isTop && isRight) {
                    const { isColliding, x, y, axisOfcollision } = search(
                        boardOfPositions,
                        'top-right'
                    );
                    const tempBoardOfStates = deepCopy2DArray2(boardOfStates);
                    if (isColliding) {
                        setScore(score + 10);
                        tempBoardOfStates[y][x] = 0;
                        setBoardOfStates(tempBoardOfStates);
                        if (axisOfcollision === 'X') {
                            tempAcceleartionX = tempAcceleartionX * -1;
                            setAccelerationX(tempAcceleartionX);
                        } else {
                            tempAcceleartionY = tempAcceleartionY * -1;
                            setAccelerationY(tempAcceleartionY);
                        }
                    }
                }
                if (isBottom && isLeft) {
                    const { isColliding, x, y, axisOfcollision } = search(
                        boardOfPositions,
                        'bottom-left'
                    );
                    const tempBoardOfStates = deepCopy2DArray2(boardOfStates);
                    if (isColliding) {
                        setScore(score + 10);
                        tempBoardOfStates[y][x] = 0;
                        setBoardOfStates(tempBoardOfStates);
                        if (axisOfcollision === 'X') {
                            tempAcceleartionX = tempAcceleartionX * -1;
                            setAccelerationX(tempAcceleartionX);
                        } else {
                            tempAcceleartionY = tempAcceleartionY * -1;
                            setAccelerationY(tempAcceleartionY);
                        }
                    }
                }
                if (isBottom && isRight) {
                    const { isColliding, x, y, axisOfcollision } = search(
                        boardOfPositions,
                        'bottom-right'
                    );
                    const tempBoardOfStates = deepCopy2DArray2(boardOfStates);
                    if (isColliding) {
                        setScore(score + 10);
                        tempBoardOfStates[y][x] = 0;
                        setBoardOfStates(tempBoardOfStates);
                        if (axisOfcollision === 'X') {
                            tempAcceleartionX = tempAcceleartionX * -1;
                            setAccelerationX(tempAcceleartionX);
                        } else {
                            tempAcceleartionY = tempAcceleartionY * -1;
                            setAccelerationY(tempAcceleartionY);
                        }
                    }
                }
            }
        }

        if (boardRef.current !== null) { // ball velocity
            if (ballX >= boardRef.current.clientWidth || ballX <= 0) {
                tempAcceleartionX = tempAcceleartionX * -1;
                setAccelerationX(tempAcceleartionX);
            }
            if (ballY <= 0) {
                tempAcceleartionY = tempAcceleartionY * -1;
                setAccelerationY(tempAcceleartionY);
            }
            if (
                ballY + ballSize >= boardRef.current.clientHeight - 8 &&
                ballX + ballSize >= paddleX &&
                ballX <= paddleX + paddleWidth
            ) {
                const middleBall = ballX + Math.round(ballSize / 2);
                const firstFifth = paddleX + paddleWidth * (1 / 5);
                const secondFifth = paddleX + paddleWidth * (2 / 5);
                const thirdFifth = paddleX + paddleWidth * (3 / 5);
                const fourthFifth = paddleX + paddleWidth * (4 / 5);
                if (middleBall < secondFifth) {
                    if (middleBall < firstFifth) {
                        console.log('outside');
                        tempAcceleartionX = -2;
                        tempAcceleartionY = -1;
                    } else {
                        console.log('insideside');
                        tempAcceleartionX = -1;
                        tempAcceleartionY = -2;
                    }
                } else if (middleBall > thirdFifth) {
                    if (middleBall > fourthFifth) {
                        console.log('outside');
                        tempAcceleartionX = 2;
                        tempAcceleartionY = -1;
                    } else {
                        console.log('insideside');
                        tempAcceleartionX = 1;
                        tempAcceleartionY = -2;
                    }
                }
                setAccelerationX(tempAcceleartionX);
                setAccelerationY(tempAcceleartionY);
            }

            if (ballY >= boardRef.current.clientHeight) {
                setGameState('paused');
            }
        }

        setBallX(ballX + tempAcceleartionX);
        setBallY(ballY + tempAcceleartionY);
        console.log({ballY});
        
    }, [decaSeconds]);
    useEffect(() => {
        window.addEventListener('keydown', handlekey);
        return () => window.removeEventListener('keydown', handlekey);
    }, []);
    useEffect(() => {
        if (life <= 0) setGameState('loss');
    }, [life]);
    useEffect(() => {
        if (keyPressed === 'none') return;
        if (keyPressed === 'a') {
            setPaddleX(paddleX - 10);
        }
        if (keyPressed === 'd') {
            setPaddleX(paddleX + 10);
        }
        if (keyPressed==='z') {
            setDecaSeconds(decaSeconds+1)
        }
        setkeyPressed('none');
    }, [keyPressed]);

    return (
        <div className='h-full w-full'>
            <div className='grid h-full w-full grid-rows-[1fr_10fr_1fr]'>
                <div className='flex h-full w-full items-center justify-center'>
                    <div className='flex h-full w-full items-center justify-center bg-orange-600'>
                        <Life life={life} />
                    </div>
                    <div className='flex h-full w-full items-center justify-center bg-blue-600'>
                        {score}
                    </div>
                </div>
                <div
                    ref={boardRef}
                    onClick={() =>
                        gameState !== 'in-game' && setGameState('in-game')
                    }
                    className='relative h-full w-full bg-black'
                >
                    <div
                        ref={gridRef}
                        className={`grid h-1/3 w-full`}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${columns}, 1fr`,
                            gridTemplateRows: `repeat(${rows}, 1fr`,
                        }}
                    >
                        {boardOfStates.map((e, Ypos) =>
                            e.map((el, Xpos) => (
                                <Bricks key={Xpos} state={el} />
                            ))
                        )}
                    </div>
                    <div
                        style={{
                            left: ballX,
                            top: ballY,
                            height: `${ballSize}px`,
                            width: `${ballSize}px`,
                        }}
                        className={`absolute rounded-full bg-purple-600`}
                    ></div>

                    <Paddle Xposition={paddleX} paddleWidth={paddleWidth} />

                    {gameState !== 'in-game' && (
                        <div className='absolute top-1/2 flex h-48 w-full -translate-y-1/2 items-center justify-center bg-green-600'>
                            <p className='text-8xl'>Press To Start</p>
                        </div>
                    )}
                </div>
                <div className='flex h-full w-full items-center justify-center'>
                    <button className='h-full w-full bg-pink-600'>left</button>
                    <button className='h-full w-full bg-cyan-600'>right</button>
                </div>
            </div>
        </div>
    );
};
export default BreakOut;
