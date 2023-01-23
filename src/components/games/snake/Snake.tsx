import React, { useState } from 'react';

type GameStateType = 'won' | 'loss' | 'in-game' | 'paused';

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
    const CLEANBOARD = initializeBoard(50, 50);
    const [snake, setSnake] = useState<number[][]>([]);
    const [gameState, setGameState] = useState<GameStateType>('in-game');
    const [board, setBoard] = useState<number[][]>(deepCopy2DArray(CLEANBOARD));

    function renderSnake(): void {
        const newBoard = deepCopy2DArray(board);
        for (let i = 0; i < snake.length; i++) {
            newBoard[snake[i][0]][snake[i][1]] = 1;
        }
        setBoard(newBoard);
    }

    function moveSnake(direction: string): void {
        const newSnake = deepCopy2DArray(snake);
        const head = newSnake[newSnake.length - 1];
        if (direction === 'up') {
            newSnake.push([head[0] - 1, head[1]]);
        }
        if (direction === 'down') {
            newSnake.push([head[0] + 1, head[1]]);
        }
        if (direction === 'left') {
            newSnake.push([head[0], head[1] - 1]);
        }
        if (direction === 'right') {
            newSnake.push([head[0], head[1] + 1]);
        }
        newSnake.shift();
        setSnake(newSnake);
    }

    return <div>Snake</div>;
};

export default Snake;
