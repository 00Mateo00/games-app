/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import { ICell } from './interfaces';
import Cell from './Cell';

interface GameStatus {
    score: number;
    flags: number;
    clearedCells: number;
    availableCells: number;
    result: 'in-game' | 'won' | 'lost' | 'stopped';
}

const MineSweeper: React.FC = () => {
    const { settings, setSettings, inGameView } = useContext(GlobalContext);
    const { difficulty } = settings;

    const [board, setBoard] = useState<ICell[][]>([]);
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [gameStatus, setGameStatus] = useState<GameStatus>({
        score: 0,
        flags: 0,
        clearedCells: 0,
        availableCells: 0,
        result: 'in-game',
    });

    const [time, setTime] = useState('00:00');

    let cellsClearedCounter = 0;

    function BoardInitializer(numRows: number, numColumns: number): ICell[][] {
        const newBoard: ICell[][] = [];
        for (let i = 0; i < numRows; i++) {
            const row: ICell[] = [];
            for (let j = 0; j < numColumns; j++) {
                row.push({
                    isBomb: false,
                    isRevealed: false,
                    isFlag: false,
                    numberOfBombs: 0,
                    wasCleaned: false,
                    position: {
                        y: i,
                        x: j,
                    },
                });
            }
            newBoard.push(row);
        }

        return newBoard;
    }

    function plantMines(
        board: ICell[][],
        numMines: number,
        numRows: number,
        numColumns: number
    ): void {
        while (numMines > 0) {
            const y = Math.floor(Math.random() * numRows);
            const x = Math.floor(Math.random() * numColumns);
            if (board[y][x].isBomb === true) continue;
            if (board[y][x].wasCleaned === true) continue;

            board[y][x].isBomb = true;

            numMines--;
        }
    }

    function generateBoard(numRows: number, numColumns: number): void {
        setIsFirstClick(true);
        const totalCells = numRows * numColumns;
        let numMines = 0;
        switch (difficulty) {
            case 'easy':
                numMines = Math.floor(totalCells * 0.2);
                break;
            case 'medium':
                numMines = Math.floor(totalCells * 0.4);
                break;
            case 'hard':
                numMines = Math.floor(totalCells * 0.6);
                break;
            default:
                numMines = 0;
        }
        setGameStatus({
            ...gameStatus,
            flags: numMines,
            availableCells: totalCells - numMines,
        });
        const newBoard = BoardInitializer(numRows, numColumns);

        plantMines(newBoard, numMines, numRows, numColumns);

        setBoard(newBoard);
    }

    function flagIt(y: number, x: number): void {
        const tempBoard: ICell[][] = [...board];
        console.log('flagging');

        if (tempBoard[y][x].isRevealed) return;
        console.log("it ain't revelead");

        if (tempBoard[y][x].isFlag) {
            console.log('it is flagged');

            tempBoard[y][x].isFlag = false;
            setGameStatus({ ...gameStatus, flags: gameStatus.flags + 1 });
            return;
        }

        console.log("it ain't flagged");

        if (gameStatus.flags <= 0) return;

        console.log(`remaining flags: ${gameStatus.flags}`);

        tempBoard[y][x].isFlag = true;

        setGameStatus({ ...gameStatus, flags: gameStatus.flags - 1 });

        setBoard(tempBoard);
    }

    function revealCell(y: number, x: number): void {
        type options = 'Do_Recursion' | 'Search_Surrounding_Mines' | 'Clean';
        const tempBoard = [...board];
        let tempResult: GameStatus['result'] = 'in-game';

        function lookAround(option: options): number {
            let surroundingMines = 0;

            function searchForMines(i: number, j: number): void {
                if (tempBoard[i][j].isBomb === true) {
                    surroundingMines++;
                }
            }

            function clean(i: number, j: number): void {
                tempBoard[i][j].isBomb = false;
                tempBoard[i][j].wasCleaned = true;
            }
            // prettier-ignore
            for (let i = y - 1; i <= y + 1; i++) {
              for (let j = x - 1; j <= x + 1; j++) {
                  if ( i >= 0 && i < tempBoard.length && j >= 0 && j < tempBoard[0].length) { 
                      if (option === 'Do_Recursion') revealCell(i, j);
                      if (option === 'Search_Surrounding_Mines') searchForMines(i, j);
                      if (option === 'Clean') clean(i,j);
                  }
              }
            }

            return surroundingMines;
        }
        function auxFunction(y: number, x: number): void {
            const actualCell = tempBoard[y][x];
            // prettier-ignore
            if (actualCell.isRevealed === true || actualCell.isFlag === true) return; // isCellUnavailable?

            actualCell.isRevealed = true;
            cellsClearedCounter++;

            if (actualCell.isBomb === true) {
                tempResult = 'lost';
            } else {
                const surroundingMines = lookAround('Search_Surrounding_Mines');
                actualCell.numberOfBombs = surroundingMines;

                if (surroundingMines === 0) {
                    // reveal surrounding cells recursively
                    lookAround('Do_Recursion');
                }
            }
        }

        function replantAdjacentMines(): void {
            if (!isFirstClick) return;
            const surroundingMines = lookAround('Search_Surrounding_Mines');
            if (tempBoard[y][x].isBomb === false) return;
            lookAround('Clean');
            plantMines(tempBoard, surroundingMines, 9, 9);
        }

        replantAdjacentMines();
        auxFunction(y, x);
        setGameStatus({
            ...gameStatus,
            result: tempResult,
            clearedCells: gameStatus.clearedCells + cellsClearedCounter,
        });
        setBoard(tempBoard);
        setIsFirstClick(false);
    }

    function parseTime(n: number): string {
        if (n < 10) {
            return `0${n}`;
        }
        return `${n}`;
    }

    function reset(): void {
        setGameStatus({
            score: 0,
            flags: 0,
            clearedCells: 0,
            availableCells: 0,
            result: 'stopped',
        });
        setTime('00:00');
        cellsClearedCounter = 0;
    }

    useEffect(() => {
        if (isFirstClick) return;
        if (gameStatus.clearedCells >= gameStatus.availableCells) {
            setGameStatus({ ...gameStatus, result: 'won' });
        }
    }, [gameStatus.clearedCells, gameStatus.availableCells]);

    useEffect(() => {
        const initialTime = Date.now();
        const interval = setInterval(() => {
            const time = Math.floor((Date.now() - initialTime) / 1000);
            const sec = time % 60;
            const min = Math.floor(time / 60);

            if (min > 99) clearInterval(interval);
            setTime(`${parseTime(min)}:${parseTime(sec)}`);
        }, 1000);

        if (
            isFirstClick ||
            (gameStatus.result !== 'in-game' && gameStatus.result === 'stopped')
        ) {
            console.log(gameStatus.result);
            setGameStatus({ ...gameStatus, result: 'in-game' });
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isFirstClick, gameStatus.result]);

    useEffect(() => {
        if (gameStatus.result === 'won') {
            // code
            console.log('won');

            return;
        }
        if (gameStatus.result === 'lost') {
            // code
            console.log('lost');
        }
        if (gameStatus.result === 'in-game') {
            generateBoard(9, 9);
        }
    }, [gameStatus.result]);

    useEffect(() => {
        generateBoard(9, 9);
    }, [inGameView]);

    useEffect(() => {
        reset();
    }, [difficulty]);

    return (
        <div className='h-full w-full'>
            <div className='relative h-full w-full '>
                <div
                    onClick={() => {
                        reset();
                    }}
                    className={
                        `absolute top-0 left-0 flex h-full w-full items-center justify-center transition-all` +
                        ` ${
                            gameStatus.result === 'in-game' ||
                            gameStatus.result === 'stopped'
                                ? 'z-0 opacity-0'
                                : 'z-10 opacity-100'
                        }`
                    }
                >
                    <div
                        className='flex h-48 w-full items-center
                justify-center bg-green-500 text-center'
                    >
                        <p className='text-3xl'>{gameStatus.result}</p>
                    </div>
                </div>
                <div className='z-1 absolute top-0 left-0 h-full w-full'>
                    <div className='grid h-24 w-full grid-cols-[3fr_4fr] bg-purple-500'>
                        <div className='flex h-full w-full items-center justify-center bg-orange-500'>
                            <p className='text-4xl'>{time}</p>
                        </div>
                        <div className='flex h-full w-full flex-col items-center justify-center bg-violet-900'>
                            <div>
                                <p className='text-3xl'>CHANGE DIFFICULTY</p>
                            </div>
                            <div className='flex h-full w-full items-center justify-around'>
                                <button
                                    onClick={() => {
                                        reset();
                                    }}
                                    className='primary-button px-2 text-xl'
                                >
                                    restart
                                </button>
                                <button
                                    onClick={() => {
                                        setSettings({
                                            ...settings,
                                            difficulty: 'easy',
                                        });
                                    }}
                                    className='text-xl'
                                >
                                    easy
                                </button>
                                <button
                                    onClick={() => {
                                        setSettings({
                                            ...settings,
                                            difficulty: 'medium',
                                        });
                                    }}
                                    className='text-xl'
                                >
                                    medium
                                </button>
                                <button
                                    onClick={() => {
                                        setSettings({
                                            ...settings,
                                            difficulty: 'hard',
                                        });
                                    }}
                                    className='text-xl'
                                >
                                    hard
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='board row-auto grid h-[calc(100%_-_6rem)] w-full grid-cols-9'>
                        {board.map((row) =>
                            row.map((cell, columnIndex) => (
                                <Cell
                                    key={columnIndex}
                                    cell={cell}
                                    revealCell={revealCell}
                                    flagIt={flagIt}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MineSweeper;
