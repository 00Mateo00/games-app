/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';
import { ICell, Difficulty } from '../components/games/mineSweeper/interfaces';

interface Props {
    children: React.ReactNode;
}

export default function ContextWrapper({ children }: Props): JSX.Element {
    const [isSomeCardClicked, setIsSomeCardClicked] = useState(false);
    const [screenWidth, setScreenWidth] = useState<Number>(window.innerWidth);

    const [board, setBoard] = useState<ICell[][]>([]);
    const [isFirstClick, setIsFirstClick] = useState(true);

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
            console.log(y, x);

            numMines--;
        }
    }

    function generateBoard(
        numRows: number,
        numColumns: number,
        difficulty: Difficulty,
        customBoard?: boolean
    ): void {
        console.log(customBoard);

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
        const newBoard = BoardInitializer(numRows, numColumns);

        if (customBoard !== (false || undefined)) {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColumns; j++) {
                    if (i < 3 && j >= numColumns - 3) {
                        newBoard[i][j].isBomb = false;
                    } else {
                        newBoard[i][j].isBomb = true;
                    }
                }
            }
        } else {
            plantMines(newBoard, numMines, numRows, numColumns);
        }

        setBoard(newBoard);
    }

    function flagIt(y: number, x: number): void {
        const tempBoard: ICell[][] = [...board];
        tempBoard[y][x].isFlag = !(tempBoard[y][x].isFlag as boolean);
        setBoard(tempBoard);
    }

    function revealCell(y: number, x: number): void {
        type options = 'Do_Recursion' | 'Search_Surrounding_Mines' | 'Clean';
        const tempBoard = [...board];

        function lookAround(option: options): number {
            let surroundingMines = 0;

            function searchForMines(i: number, j: number): void {
                console.log(tempBoard);

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
                        if (option === 'Do_Recursion') auxFunction(i, j);
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

            if (actualCell.isBomb === true) {
                // game over logic goes here
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
            if (tempBoard[y][x].isBomb === false) return;
            const surroundingMines = lookAround('Search_Surrounding_Mines');
            if (surroundingMines < 5) return;
            lookAround('Clean');
            plantMines(tempBoard, surroundingMines, 9, 9);
        }
        console.log(isFirstClick);

        replantAdjacentMines();
        auxFunction(y, x);
        setBoard(tempBoard);
        setIsFirstClick(false);
    }

    useEffect(() => {
        window.addEventListener('resize', () =>
            setScreenWidth(window.innerWidth)
        );
        return () => {
            window.removeEventListener('resize', () =>
                setScreenWidth(window.innerWidth)
            );
        };
    }, []);
    return (
        <GlobalContext.Provider
            value={{
                isSomeCardClicked,
                setIsSomeCardClicked,
                screenWidth,
                setScreenWidth,

                board,
                setBoard,
                generateBoard,
                flagIt,
                revealCell,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
