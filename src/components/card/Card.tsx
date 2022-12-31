import React from 'react';
import Image from '../../assets/card-Images/tetris.png';

const card: React.FC = () => {
    /* group/edit w-full lg:w-4/5 lg:hover:w-full m-auto  h-[calc(100%-2.5rem)] sm:h-[calc(100%-3.5rem)] lg:h-[calc(90%-5rem)] lg:hover:h-[calc(100%-5rem)] rounded-2xl grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] overflow-hidden
     */
    return (
        <div className='relative flex justify-center items-center w-full h-[calc(100%-2.5rem)] sm:h-[calc(100%-3.5rem)] lg:h-[calc(100%-5rem)] lg:py-8'>
            <div className='group/edit lg:hover:absolute lg:hover:top-0 w-full lg:w-4/5 lg:hover:w-full h-full lg:h-full lg:hover:h-[102.5%] rounded-md border border-background-primaryButton border-opacity-50 lg:hover:border-0 lg:shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] overflow-hidden'>
                <img
                    src={Image}
                    alt='GameName'
                    className='w-full h-full overflow-hidden object-cover object-[50%_10%]'
                ></img>
                <div className='lg:group-hover/edit:grid w-full h-full lg:group-hover/edit:p-5 lg:grid-cols-[6fr_5fr] bg-background-card'>
                    <div className='w-full h-full flex-col flex justify-start items-start px-5 my-auto '>
                        <h1>Game Name</h1>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Facere sit eos minus quos natus accusantium
                            explicabo odit velit dolorem esse!
                        </p>
                        <button className='hidden bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center'>
                            PLAY
                        </button>
                    </div>
                    <div className='w-full bg-orange-600 flex justify-center items-center'>
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
