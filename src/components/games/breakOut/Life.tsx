import React from 'react';
import './life.scss';

interface Props {
    life: number;
}

const Life: React.FC<Props> = ({ life }) => {
    return (
        <div className='flex h-full w-1/3 items-center justify-around'>
            <div className={`${life >= 1 ? 'fill' : 'empty'} heart`}></div>
            <div className={`${life >= 2 ? 'fill' : 'empty'} heart`}></div>
            <div className={`${life >= 3 ? 'fill' : 'empty'} heart`}></div>
        </div>
    );
};
export default Life;
