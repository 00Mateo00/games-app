import React from 'react';
import Image from '../../assets/card-Images/tetris.png';

const Card: React.FC = () => {
    /* grid grid-cols-[6fr_0fr] transition-all delay-75 duration-500 w-full h-full bg-purple-900 z-[1] relative before:absolute before:opacity-0 before:content-[""] before:top-0 before:left-0 before:z-[-1] before:bg-gradient-to-br before:from-violet-600 before:to-violet-800 before:transition-all before:delay-75 before:duration-500 lg:group-hover/edit:before:opacity-100 before:w-full before:h-full  */

    const cardContent = (
        <>
            <img
                src={Image}
                alt='GameName'
                className='w-full h-full overflow-hidden object-cover object-[50%_10%]'
            ></img>
            <div className='grid grid-cols-[6fr_0fr] transition-all delay-75 duration-500 w-full h-full bg-purple-900 z-[1] relative before:absolute before:opacity-0 before:content-[""] before:top-0 before:left-0 before:z-[-1] before:bg-gradient-to-br before:from-violet-600 before:to-violet-800 before:transition-all before:delay-75 before:duration-500 lg:group-hover/edit:before:opacity-100 before:w-full before:h-full '>
                <div className='w-full h-full grid grid-rows-[1fr_0fr_0fr] group-hover/edit:grid-rows-[1fr_1fr_0fr]'>
                    <h1 className='w-full h-full flex justify-center items-center bg-red-500 transition-all'>
                        Game Name
                    </h1>
                    <p className='h-full w-full truncate bg-purple-200'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Facere sit eos minus quos natus accusantium
                        explicabo odit velit dolorem esse!
                    </p>
                    <button className='h-full w-full truncate bg-green-200'>
                        PLAY
                    </button>
                </div>
                <div className='w-full scale-0 transition-all delay-75 duration-500 bg-orange-400 flex flex-col justify-center items-center truncate rounded-md'>
                    <div className='flex justify-around items-center w-full h-full'>
                        <button className='truncate'>easy</button>
                        <button className='truncate'>medium</button>
                        <button className='truncate'>hard</button>
                    </div>
                    <div className='flex justify-around items-center w-full h-full'>
                        <button className='bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center truncate'>
                            settiings
                        </button>
                        <button className='bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center truncate'>
                            scores
                        </button>
                        <button className='bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center truncate'>
                            tutorial
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
    //

    /* <div className='group/edit lg:absolute lg:top-1/2 lg:-translate-y-[47.5%] w-full lg:w-3/4 lg:hover:scale-x-[130%]  h-full lg:h-5/6 lg:m-auto lg:hover:scale-y-[122.5%] rounded-md border border-background-primaryButton border-opacity-50 lg:hover:border-0 lg:shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] lg:transition-all delay-75 lg:duration-500 overflow-hidden'></div> */
    return (
        <div className='group/edit z-0 hover:z-10 absolute top-0 w-full h-full lg:hover:scale-x-[130%] lg:hover:scale-y-[122.5%] rounded-md border border-background-primaryButton border-opacity-50 shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] lg:transition-all delay-75 lg:duration-500 overflow-hidden'>
            {cardContent}
        </div>
    );
};
export default Card;
