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
                });
            }
            newBoard.push(row);
        }

        return newBoard;
    }

    function generateBoard(
        numRows: number,
        numColumns: number,
        difficulty: Difficulty
    ): void {
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

        while (numMines > 0) {
            const row = Math.floor(Math.random() * numRows);
            const col = Math.floor(Math.random() * numColumns);
            if (newBoard[row][col].isBomb !== true) {
                newBoard[row][col].isBomb = true;
                numMines--;
            }
        }

        setBoard(newBoard);
    }

    function revealCell(row: number, col: number): void {
        type options = 'Do_Recursion' | 'Search_Surrounding_Mines';
        const tempBoard = [...board];

        function auxFunction(row: number, col: number): void {
            const actualCell = tempBoard[row][col];
            function lookAround(option: options): number {
                let surroundingMines = 0;

                function searchForMines(
                    tempBoard: ICell[][],
                    i: number,
                    j: number
                ): void {
                    if (tempBoard[i][j].isBomb === true) {
                        surroundingMines++;
                    }
                }
                // prettier-ignore
                for (let i = row - 1; i <= row + 1; i++) {
                    for (let j = col - 1; j <= col + 1; j++) {
                        if ( i >= 0 && i < tempBoard.length && j >= 0 && j < tempBoard[0].length) { 
                            if (option === 'Do_Recursion') revealCell(i, j);
                            if (option === 'Search_Surrounding_Mines') searchForMines(tempBoard, i, j);
                        }
                    }
                }

                return surroundingMines;
            }

            if (actualCell.isRevealed === true || actualCell.isFlag === true)
                return; // isCellUnavailable? // prettier-ignore

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
        auxFunction(row, col);
        setBoard(tempBoard);
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
                revealCell,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
