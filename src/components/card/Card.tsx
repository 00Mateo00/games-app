import React from 'react';
import Image from '../../assets/card-Images/tetris.png';

const Card: React.FC = () => {
    const primary =
        'bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center';
    const cardContent = (
        <>
            <img
                src={Image}
                alt='GameName'
                className='w-full h-full overflow-hidden object-cover object-[50%_10%]'
            ></img>
            <div className='lg:childButton:truncate lg:childButton:scale-y-0 lg:group-hover/edit:childButton:scale-y-100  lg:childButton:transition-all  lg:childButton:delay-0 lg:childButton:duration-100 lg:group-hover/edit:childButton:delay-[575ms] lg:group-hover/edit:childButton:duration-100 lg:grid grid-cols-[6fr_0fr] lg:group-hover/edit:grid-cols-[6fr_5fr] lg:transition-all lg:delay-75 lg:duration-500 w-full h-full lg:group-hover/edit:p-5 bg-purple-900 z-[1] relative before:absolute before:opacity-0 before:content-[""] before:top-0 before:left-0 before:z-[-1] before:bg-gradient-to-br before:from-violet-600 before:to-violet-800 before:transition-all  before:delay-75 before:duration-500 lg:group-hover/edit:before:opacity-100 before:w-full before:h-full '>
                <div className='w-full h-full flex-col flex justify-start items-start px-5 my-auto '>
                    <h1>Game Name</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Facere sit eos minus quos natus accusantium
                        explicabo odit velit dolorem esse!
                    </p>
                    <button className={primary}>PLAY</button>
                </div>
                <div className='w-full lg:scale-x-0 lg:group-hover/edit:scale-x-100  lg:transition-all delay-75 lg:duration-500 bg-orange-400 flex flex-col justify-center items-center scale-y-0 truncate rounded-md transition-all duration-500 group-hover/edit:scale-y-100 '>
                    <div className='flex justify-around items-center w-full h-full'>
                        <button>easy</button>
                        <button>medium</button>
                        <button>hard</button>
                    </div>
                    <div className='flex justify-around items-center w-full h-full'>
                        <button className={primary}>settiings</button>
                        <button className={primary}>scores</button>
                        <button className={primary}>tutorial</button>
                    </div>
                </div>
            </div>
        </>
    );

    /* <div className='group/edit lg:absolute lg:top-1/2 lg:-translate-y-[47.5%] w-full lg:w-3/4 lg:hover:scale-x-[130%]  h-full lg:h-5/6 lg:m-auto lg:hover:scale-y-[122.5%] rounded-md border border-background-primaryButton border-opacity-50 lg:hover:border-0 lg:shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] lg:transition-all delay-75 lg:duration-500 overflow-hidden'></div> */
    return (
        <div className='group/edit z-0 hover:z-10 absolute top-0 w-full h-full lg:hover:scale-x-[130%] lg:hover:scale-y-[122.5%] rounded-md border border-background-primaryButton border-opacity-50 shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] lg:transition-all delay-75 lg:duration-500 overflow-hidden'>
            {cardContent}
        </div>
    );
};
export default Card;
