import React from 'react';
import Image from '../../assets/card-Images/tetris.png';

const card: React.FC = () => {
    return (
        <div className='relative flex justify-center items-center w-full h-[calc(100%-2.5rem)] sm:h-[calc(100%-3.5rem)] lg:h-[calc(100%-5rem)] lg:py-8'>
            <div className='group/edit lg:hover:absolute lg:hover:top-0 w-full lg:w-4/5 lg:hover:transform lg:hover:scale-x-105  h-full lg:h-full lg:hover:scale-y-105 rounded-md border border-background-primaryButton border-opacity-50 lg:hover:border-0 lg:shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] lg:transition-all delay-[1s] lg:duration-[5s]  overflow-hidden'>
                <img
                    src={Image}
                    alt='GameName'
                    className='w-full h-full overflow-hidden object-cover object-[50%_10%]'
                ></img>
                <div className='lg:group-hover/edit:childButton:block  childButton:scale-y-0 ] lg:group-hover/edit:childButton:scale-100  lg:childButton:transition-all  lg:childButton:delay-[2s] lg:childButton:duration-[2.5s]  lg:grid grid-cols-[6fr_0fr] lg:group-hover/edit:grid-cols-[6fr_5fr] lg:transition-all lg:delay-[1s] lg:duration-[5s]  w-full h-full lg:group-hover/edit:p-5  bg-background-card'>
                    <div className='w-full h-full flex-col flex justify-start items-start px-5 my-auto '>
                        <h1>Game Name</h1>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Facere sit eos minus quos natus accusantium
                            explicabo odit velit dolorem esse!
                        </p>
                        <button className='bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center'>
                            PLAY
                        </button>
                    </div>
                    <div className='w-full lg:transform lg:scale-x-0 lg:group-hover/edit:scale-x-100 lg:transition-all delay-[1s] lg:duration-[5s] bg-orange-600 flex justify-center items-center'>
                        <div>
                            <button>easy</button>
                            <button>medium</button>
                            <button>hard</button>
                        </div>
                        <div>
                            <button>settiings</button>
                            <button>scores</button>
                            <button>tutorial</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default card;
