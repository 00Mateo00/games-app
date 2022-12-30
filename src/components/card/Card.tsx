import React from 'react';
import './card.scss';
import Image from '../../assets/card-Images/tetris.png';

const card: React.FC = () => {
    return (
        <div className='card-wrapper bg-cyan-300 w-full h-full rounded-md overflow-hidden'>
            <div className='h-full'>
                <img
                    src={Image}
                    alt='tetris'
                    className=' w-full h-2/3 object-cover object-[50%_25%]'
                />
                <div className='w-full h-1/3 flex justify-center items-center bg-background-card'>
                    <div className='grid w-[90%] h-[90%] bg-slate-400 lg:grid-cols-[5fr_4fr]'>
                        <div
                            className='lg:pl-5 w-full h-full bg-yellow-500 flex flex-col
                        items-start justify-center'
                        >
                            <h1 className='self-center lg:self-start'>
                                GAME NAME
                            </h1>
                            <p className='lg:py-6'>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Placeat incidunt tempore odit
                                sapiente enim deleniti
                            </p>
                            <button className='self-center lg:self-start bg-violet-900 rounded-lg py-1 px-2 text-orange-200 shadow-md w-48 md:w-24'>
                                PLAY
                            </button>
                        </div>
                        <div className='w-full h-full flex lg:flex-col justify-around lg:justify-center items-center bg-red-500'>
                            <div>
                                <div>
                                    <button>easy</button>
                                    <button>medium</button>
                                    <button>hard</button>
                                </div>
                                <div></div>
                            </div>
                            <div>
                                <button>setting</button>
                                <button>info</button>
                                <button>scores</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default card;
