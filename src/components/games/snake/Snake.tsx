/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import Cell from './Cell';

type GameStateType = 'won' | 'loss' | 'in-game' | 'paused';
type Directions = 'up' | 'down' | 'left' | 'right';

const Snake: React.FC = () => {
    function initializeBoard(rows: number, cols: number): number[][] {
        const board = new Array(rows)
            .fill(0)
            .map(() => new Array(cols).fill(0));

        return board;
    }
    function deepCopy2DArray(arr: number[][]): number[][] {
        return JSON.parse(JSON.stringify(arr));
    }
    const CLEANBOARD = initializeBoard(35, 35);
    const [snake, setSnake] = useState<number[][]>([
        [10, 9],
        [10, 10],
    ]);
    const [gameState, setGameState] = useState<GameStateType>('paused');
    const [board, setBoard] = useState<number[][]>(deepCopy2DArray(CLEANBOARD));
    const [time, setTime] = useState(0);
    const [direction, setDirection] = useState<Directions>('left');
    const [keyPressed, setKeyPressed] = useState('none');
    const [positionX, setPositionX] = useState(10);
    const [positionY, setPositionY] = useState(10);
    const [food, setFood] = useState<number[]>(placeFood(board));
    const [score, setScore] = useState(0);

    function reset(): void {
        
        setSnake([
            [10, 9],
            [10, 10],
        ]);
        setBoard(CLEANBOARD);
        setTime(0);
        setDirection('down');
        setPositionX(10);
        setPositionY(11);
        setFood(placeFood(board));
        setScore(0);
    }

    function renderSnake(snake: number[][]): number[][] {
        const newBoard = deepCopy2DArray(CLEANBOARD);
        newBoard[food[0]][food[1]] = 10;
        for (let i = 0; i < snake.length; i++) {
            // body
            newBoard[snake[i][0]][snake[i][1]] = 2;
            // head
            if (snake.length - 1 === i) newBoard[snake[i][0]][snake[i][1]] = 3;
            // tail
            if (i === 0) newBoard[snake[i][0]][snake[i][1]] = 1;
        }
        return newBoard;
    }

    function placeFood(board: number[][]): number[] {
        const rows = board.length;
        const cols = board[0].length;
        let randomX = Math.floor(Math.random() * cols);
        let randomY = Math.floor(Math.random() * rows);
        while (board[randomY][randomX] !== 0) {
            randomX = Math.floor(Math.random() * cols);
            randomY = Math.floor(Math.random() * rows);
        }
        return [randomY, randomX];
    }

    function isColliding(snake: number[][]): boolean {
        
        const head = snake[snake.length - 1];
        const tail = snake.slice(0, snake.length - 1);
        const rows = board.length;
        const cols = board[0].length;
        // check if the snake hit the walls
        if (head[0] < 0 || head[0] >= rows || head[1] < 0 || head[1] >= cols) {
            return true;
        }
        // check if the snake hit itself
        for (const [x, y] of tail) {
            console.log(`tail: x:${x}, y:${y}`);
            console.log(`head: x:${head[0]}, y:${head[1]}`);
            console.log(`-------------------------------------`);
            if (head[0] === x && head[1] === y) {
                
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        if (gameState !== 'in-game') return;
        const initialTime = Date.now();
        const interval = setInterval(() => {
            const time = Math.floor((Date.now() - initialTime) / 200);
            setTime(time);
        }, 200);
        return () => clearInterval(interval);
    }, [gameState]);

    useEffect(() => {
        const newSnake = snake.slice();
        newSnake.push([positionY, positionX]);
        if (positionY !== food[0] || positionX !== food[1]) {
            newSnake.shift();
        } else {
            setScore(score + 1);
            setFood(placeFood(board));
        }
        if (isColliding(newSnake)) {
            setGameState('loss');
            return;
        }
        setSnake(newSnake);
        setBoard(renderSnake(newSnake));
    }, [positionX, positionY]);

    useEffect(() => {
        if (direction === 'left') setPositionX(positionX - 1);
        if (direction === 'right') setPositionX(positionX + 1);
        if (direction === 'up') setPositionY(positionY - 1);
        if (direction === 'down') setPositionY(positionY + 1);
    }, [time, direction]);

    useEffect(() => {
        if (keyPressed === 'w') {
            if (direction === 'down') return;
            setDirection('up');
        }
        if (keyPressed === 's') {
            if (direction === 'up') return;
            setDirection('down');
        }
        if (keyPressed === 'd') {
            if (direction === 'left') return;
            setDirection('right');
        }
        if (keyPressed === 'a') {
            if (direction === 'right') return;
            setDirection('left');
        }
    }, [keyPressed]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    function handleKeyDown(e: KeyboardEvent): void {
        if (e.key === 'w') setKeyPressed('w');
        if (e.key === 's') setKeyPressed('s');
        if (e.key === 'd') setKeyPressed('d');
        if (e.key === 'a') setKeyPressed('a');
    }

    return (
        <div className='h-full w-full'>
            <div className={`grid h-full w-full grid-rows-[1fr_10fr_1fr]`}>
                <div className='grid h-full w-full'>
                    <div className='flex h-full w-full items-center justify-center bg-blue-500'>
                        <p className='text-6xl'>{score}</p>
                    </div>
                </div>
                <div className='flex h-full w-full items-center justify-center'>
                    <div
                        onClick={() => {
                            if (gameState === 'in-game') return;
                            setGameState('in-game');
                            reset();
                        }}
                        className={`relative grid h-full w-5/6 bg-black`}
                        style={{
                            gridTemplateColumns: `repeat(${CLEANBOARD.length}, 1fr)`,
                            gridTemplateRows: `repeat(${CLEANBOARD[0].length}, 1fr)`,
                        }}
                    >
                        {board.map((e, i) =>
                            e.map((e, i) => (
                                <Cell key={i} state={e}  direction={direction} />
                            ))
                        )}
                        {gameState !== 'in-game' && (
                            <div className='absolute top-1/2 flex h-48 w-full -translate-y-1/2 items-center justify-center bg-green-600'>
                                <p className='text-6xl'>Press To Start</p>{' '}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Snake;
