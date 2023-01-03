import React from 'react';
import Image from '../../assets/card-Images/tetris.png';

const Card: React.FC = () => {
    const transtions1 = ` transition-all delay-75 duration-500`;

    const cardContent = (
        <>
            <img
                src={Image}
                alt='GameName'
                className={
                    `${transtions1}` +
                    ` w-full h-full overflow-hidden object-cover object-[50%_10%]` +
                    ` group-hover/edit:opacity-[95%]`
                }
            ></img>
            <div
                className={
                    `grid grid-cols-[6fr_0fr] w-full h-full bg-purple-900 z-[1] relative before:absolute before:opacity-0 before:content-[""] before:top-0 before:left-0 before:z-[-1] before:bg-gradient-to-br before:from-violet-600 before:to-violet-800 before:transition-all before:delay-75 before:duration-500 lg:group-hover/edit:before:opacity-100 before:w-full before:h-full` +
                    `${transtions1}`
                }
            >
                <div
                    className={
                        `w-full h-full grid grid-rows-[1fr_0fr_0fr] group-hover/edit:grid-rows-[1fr_1fr_0fr]` +
                        `${transtions1}`
                    }
                >
                    <div
                        className={
                            `w-full h-full grid grid-cols-[1fr_0fr] place-items-center group-hover/edit:grid-cols-[auto_1fr] group-hover/edit:p-2 transition-all` +
                            ` ${transtions1}`
                        }
                    >
                        <h1
                            className={
                                `transition-all delay-100 duration-700` +
                                ` group-hover/edit:text-3xl group-hover/edit:delay-75 group-hover/edit:duration-500`
                            }
                        >
                            Game Name
                        </h1>
                    </div>
                    <p
                        className={
                            `truncate w-full h-full flex justify-center scale-0 group-hover/edit:scale-100 group-hover/edit:px-2 group-hover/edit:pb-2 group-hover/edit:whitespace-normal overflow-auto text-xs` +
                            ` ${transtions1}`
                        }
                    >
                        Lorem ipsum dolor, sit amet
                        consecteturgroup-hover/edit:px-2group-hover/edit:px-2group-hover/edit:px-2
                    </p>
                    <button
                        className={`bg-background-primaryButton rounded-xl w-0 h-0 flex items-center justify-center truncate scale-y-0 transition-all`}
                    >
                        PLAY
                    </button>
                </div>
                <div
                    className={`w-full scale-0 transition-all delay-75 duration-500 flex flex-col justify-center items-center truncate rounded-md`}
                >
                    <div
                        className={`flex justify-around items-center w-full h-full`}
                    >
                        <button className={`truncate`}>easy</button>
                        <button className={`truncate`}>medium</button>
                        <button className={`truncate`}>hard</button>
                    </div>
                    <div
                        className={`flex justify-around items-center w-full h-full`}
                    >
                        <button
                            className={`bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center truncate`}
                        >
                            settiings
                        </button>
                        <button
                            className={`bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center truncate`}
                        >
                            scores
                        </button>
                        <button
                            className={`bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center truncate`}
                        >
                            tutorial
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
    //

    /* <div className={`group/edit lg:absolute lg:top-1/2 lg:-translate-y-[47.5%] w-full lg:w-3/4 lg:hover:scale-x-[130%]  h-full lg:h-5/6 lg:m-auto lg:hover:scale-y-[122.5%] rounded-md border border-background-primaryButton border-opacity-50 lg:hover:border-0 lg:shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] lg:transition-all delay-75 lg:duration-500 overflow-hidden`}></div> */
    return (
        <div
            className={
                ` group/edit z-0 hover:z-10 absolute top-0 w-full h-full lg:hover:scale-x-[130%] lg:hover:scale-y-[122.5%] rounded-md border border-background-primaryButton border-opacity-50 shadow-none lg:hover:shadow-card grid grid-rows-[3fr_1fr] lg:grid-rows-[8fr_3fr] lg:hover:grid-rows-[8fr_4fr] lg:transition-all delay-75 lg:duration-500 overflow-hidden` +
                ` before:absolute before:opacity-0 before:content-[""] before:top-0 before:left-0 before:z-[-1] before:bg-violet-600 before:transition-all before:delay-75 before:duration-500 hover:before:opacity-100 before:w-full before:h-full`
            }
        >
            {cardContent}
        </div>
    );
};
export default Card;
