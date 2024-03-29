import React from 'react';

const Conwey: React.FC = () => {
    const generateEmptyMatrix = (
        numRows: number,
        numCols: number
    ): number[][] => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numCols; j++) {
                row.push(0);
            }
            rows.push(row);
        }
        return rows;
    };

    generateEmptyMatrix(100, 100);

    return <div>Conwey</div>;
};
export default Conwey;
