/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import React from 'react';
import { ICell } from './interfaces';
import './cell.scss';
interface props {
    cell: ICell;
    revealCell: (y: number, x: number) => void;
    flagIt: (y: number, x: number) => void;
}

const Cell: React.FC<props> = ({ cell, revealCell, flagIt }) => {
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
        return numberOfBombs !== 0 ? numberOfBombs.toString() : '';
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
                ` ${
                    isRevealed === true ? ' cell_revealed' : ' cell_unrevealed'
                }` +
                ` ${isBomb === true ? 'bomb' : ''}` +
                ` cell flex h-full w-full items-center justify-center`
            }
        >
            <p
                className={`${COLORS[numberOfBombs]} ${
                    isFlag === true ? '🚩' : ''
                }`}
            >
                {cellContent()}
            </p>
        </div>
    );
};

export default Cell;
