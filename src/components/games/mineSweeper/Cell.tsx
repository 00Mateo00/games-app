/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import React, { useContext } from 'react';
import { ICell } from './interfaces';
import './cell.scss';
import GamesContext from '../GamesContext';
interface props {
    cell: ICell;
}

const Cell: React.FC<props> = ({ cell }) => {
    const { revealCell, flagIt } = useContext(GamesContext);
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
        if (isFlag) {
            console.log(`coords [${y},${x}]`);

            console.log({ isFlag });
        }

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
                `${
                    isRevealed === true ? ' cell_revealed' : ' cell_unrevealed'
                }` +
                ` ${isBomb === true ? 'bomb' : ''}` +
                ` cell flex h-10 w-10 items-center justify-center ${COLORS[numberOfBombs]}`
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
