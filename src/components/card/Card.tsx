import React from 'react';
import Image from '../../assets/card-Images/tetris.png';

const card: React.FC = () => {
    /* div className='w-full h-full md:p-5 hidden grid grid-rows-[3fr_1fr] md:grid-rows-none md:grid-cols-[6fr_5fr] bg-background-card rounded-[0_0_1rem_1rem]'>
            <div className='w-full bg-yellow-500 flex justify-center items-center'></div>
            <div className='w-full bg-orange-600 flex justify-center items-center'></div>
        </div> 
        <div className='w-full h-full md:p-5 lg:hover:grid lg:grid-cols-[6fr_5fr] bg-background-card'>
            <div className='w-full h-full bg-yellow-500 flex justify-center items-center'></div>
            <div className='w-full bg-orange-600 flex justify-center items-center'></div>
        </div>
    */
    return (
        <div className='w-full h-[calc(100%-2.5rem)] sm:h-[calc(100%-3.5rem)] lg:h-[calc(100%-5rem)] rounded-2xl grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] overflow-hidden'>
            <img
                src={Image}
                alt='GameName'
                className='w-full h-full overflow-hidden object-cover object-[50%_10%]'
            ></img>
            <div className='w-full h-full md:p-5 lg:hover:grid lg:grid-cols-[6fr_5fr] bg-background-card'>
                <div className='w-full h-full bg-yellow-500 flex justify-center items-center'></div>
                <div className='w-full bg-orange-600 flex justify-center items-center'></div>
            </div>
        </div>
    );
};
export default card;
