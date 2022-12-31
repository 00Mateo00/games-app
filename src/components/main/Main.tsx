import React from 'react';
import Imagen from '../../assets/card-Images/tetris.png';

const Main: React.FC = () => {
    return (
        <div className='w-full md:w-5/6 h-full lg:w-4/6 xl:w-3/5 2xl:w-1/2 overflow-auto bg-background-1'>
            <div className='w-full h-[calc(100%-7rem)] pt-10 flex justify-center'>
                <div className='w-[90%] h-full'>
                    <header className='w-full h-10 sm:h-14 lg:h-20 bg-gray-800'></header>
                    <div className='w-full h-[calc(100%-2.5rem)] sm:h-[calc(100%-3.5rem)] lg:h-[calc(100%-5rem)] rounded-lg grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr]'>
                        <img
                            src={Imagen}
                            alt='GameName'
                            className='w-full h-full rounded-[0.5rem_0.5rem_0_0] overflow-hidden object-cover object-[50%_10%]'
                        ></img>
                        <div className='w-full h-full bg-background-card rounded-[0_0_0.5rem_0.5rem]'></div>
                    </div>
                </div>
            </div>
            <footer className='w-full h-56 bg-background-alternative'></footer>
        </div>
    );
};

export default Main;
