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
    result: 'in-game' | 'won' | 'lost';
}

const MineSweeper: React.FC = () => {
    const { settings } = useContext(GlobalContext);
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
        setGameStatus({ ...gameStatus, availableCells: totalCells - numMines });
        const newBoard = BoardInitializer(numRows, numColumns);

        plantMines(newBoard, numMines, numRows, numColumns);

        setBoard(newBoard);
    }

    function flagIt(y: number, x: number): void {
        const tempBoard: ICell[][] = [...board];
        if (tempBoard[y][x].isRevealed) return;
        if (tempBoard[y][x].isFlag) {
            tempBoard[y][x].isFlag = false;
            setGameStatus({ ...gameStatus, flags: gameStatus.flags + 1 });
            return;
        }

        console.log(gameStatus.flags);
        if (gameStatus.flags <= 0) return;

        tempBoard[y][x].isFlag = true;

        setGameStatus({ ...gameStatus, flags: gameStatus.flags - 1 });

        setBoard(tempBoard);
    }

    useEffect(() => {
        if (isFirstClick) return;
        if (gameStatus.clearedCells >= gameStatus.availableCells) {
            setGameStatus({ ...gameStatus, result: 'won' });
        }
    }, [gameStatus.clearedCells, gameStatus.availableCells]);

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
    }, [gameStatus.result]);

    function revealCell(y: number, x: number): void {
        type options =
            | 'Do_Recursion'
            | 'Search_Surrounding_Mines'
            | 'Search_Surrounding_Flags'
            | 'Clean';
        const tempBoard = [...board];

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
                setGameStatus({ ...gameStatus, result: 'lost' });
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
            clearedCells: gameStatus.clearedCells + cellsClearedCounter,
        });
        setBoard(tempBoard);
        setIsFirstClick(false);
    }

    return (
        <div className='h-full w-full bg-yellow-400'>
            <button
                onClick={() => {
                    generateBoard(9, 9);
                }}
                className='primary-button h-min w-52 rounded-lg'
            >
                play
            </button>

            <div className='board row-auto grid w-max grid-cols-9'>
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
    );
};
export default MineSweeper;
