import React from 'react';

import { ICell, Difficulty } from '../components/games/mineSweeper/interfaces';

interface props {
    isSomeCardClicked: boolean;
    setIsSomeCardClicked: React.Dispatch<React.SetStateAction<boolean>>;
    screenWidth: Number;
    setScreenWidth: React.Dispatch<React.SetStateAction<Number>>;
    board: ICell[][];
    setBoard: React.Dispatch<React.SetStateAction<ICell[][]>>;
    generateBoard: (
        numRows: number,
        numColumns: number,
        difficulty: Difficulty,
        customBoard: boolean
    ) => void;
    flagIt: (numRows: number, numColumns: number) => void;
    revealCell: (row: number, col: number) => void;
}

const GlobalContext = React.createContext<props>({
    isSomeCardClicked: false,
    setIsSomeCardClicked: () => {},
    screenWidth: 0,
    setScreenWidth: () => {},
    board: [],
    setBoard: () => {},
    generateBoard: () => {},
    flagIt: () => {},
    revealCell: () => {},
});

export default GlobalContext;
