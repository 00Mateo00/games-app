/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import React, { useContext } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import { ICell } from './interfaces';
import './cell.scss';
interface props {
    cell: ICell;
}

const Cell: React.FC<props> = ({ cell }) => {
    const { revealCell, flagIt } = useContext(GlobalContext);
    const { isFlag, isRevealed, isBomb, numberOfBombs, position } = cell;
    const { y, x } = position;

    const COLORS = [
        'CFFFFFF',
        'C0000FF',
        'C00FF00',
        'CFF0000',
        'C000080',
        'C800000',
        'C008080',
        'C000000',
        'C808080',
    ];

    function cellContent(): string {
        if (isFlag === true) return '🚩';
        if (isRevealed === false) return '';
        if (isBomb === true) return '💣';
        return numberOfBombs !== 0 ? numberOfBombs.toString() : '0';
    }

    return (
        <div
            onClick={() => {
                revealCell(y, x);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                flagIt(y, x);
            }}
            className={
                `${isRevealed === true ? ' revealed' : 'unrevealed'}` +
                ` ${isBomb === true ? 'bomb' : ''}` +
                ` flex h-10 w-10 items-center justify-center ${COLORS[numberOfBombs]}`
            }
        >
            {cellContent()}
        </div>
    );
};

export default Cell;
