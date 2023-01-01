import React from 'react';
import Image from '../../assets/card-Images/tetris.png';

const card: React.FC = () => {
    /* <div className='w-full h-full flex-col flex justify-start items-start px-5 my-auto '>
                        <h1>Game Name</h1>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Facere sit eos minus quos natus accusantium
                            explicabo odit velit dolorem esse!
                        </p>
                        
                    </div>
                    <div className='w-full lg:transform lg:scale-x-0 lg:group-hover/edit:scale-x-100 lg:transition-all delay-75 lg:duration-500 bg-orange-600 flex justify-center items-center'>

                    </div> */
    return (
        <div className='relative flex justify-center items-center w-full h-[calc(100%-2.5rem)] sm:h-[calc(100%-3.5rem)] lg:h-[calc(100%-5rem)] lg:py-8'>
            <div className='group/edit lg:absolute top-1/2 -translate-y-1/2 w-full lg:w-3/4 lg:hover:scale-x-105  h-full lg:h-5/6 lg:m-auto lg:hover:scale-y-105 rounded-md border border-background-primaryButton border-opacity-50 lg:hover:border-0 lg:shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] lg:transition-all delay-75 lg:duration-500  overflow-hidden'>
                <img
                    src={Image}
                    alt='GameName'
                    className='w-full h-full overflow-hidden object-cover object-[50%_10%]'
                ></img>
                <div className='lg:group-hover/edit:childButton:truncate  childButton:scale-y-0 ] lg:group-hover/edit:childButton:scale-100  lg:childButton:transition-all  lg:childButton:delay-0 lg:childButton:duration-75 lg:group-hover/edit:childButton:delay-[575ms] lg:group-hover/edit:childButton:duration-100 lg:grid grid-cols-[6fr_0fr] lg:group-hover/edit:grid-cols-[6fr_5fr] lg:transition-all lg:delay-75 lg:duration-500 w-full h-full lg:group-hover/edit:p-5  bg-background-card'>
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
                    <div className='w-full lg:transform lg:scale-x-0 lg:group-hover/edit:scale-x-100 lg:transition-all delay-75 lg:duration-500 bg-orange-600 flex justify-center items-center'>
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
