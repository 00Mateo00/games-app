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
                    ` h-full w-full overflow-hidden object-cover object-[50%_10%]` +
                    ` group-hover/edit:opacity-[95%]`
                }
            ></img>
            <div
                className={
                    `relative z-[1] grid h-full w-full grid-cols-[6fr_0fr] bg-purple-900 ` +
                    ` before:absolute before:top-0 before:left-0 before:z-[-1] before:h-full before:w-full before:bg-gradient-to-br before:from-violet-600 before:to-violet-800 before:opacity-0 before:transition-all before:delay-75 before:duration-500 before:content-[""]` +
                    ` before:transition-all before:delay-75 before:duration-500` +
                    ` group-hover/edit:before:opacity-100` +
                    `${transtions1}`
                }
            >
                <div
                    className={
                        `grid h-full w-full grid-rows-[1fr_0fr_0fr]` +
                        ` group-hover/edit:grid-rows-[1fr_1fr_0fr]` +
                        `${transtions1}`
                    }
                >
                    <div
                        className={
                            `grid h-full w-full grid-cols-[1fr_0fr] place-items-center transition-all` +
                            `  group-hover/edit:grid-cols-[auto_1fr] group-hover/edit:p-2` +
                            ` ${transtions1}`
                        }
                    >
                        <h1
                            className={
                                `transition-all delay-100 duration-700` +
                                ` group-hover/edit:text-3xl group-hover/edit:delay-75 group-hover/edit:duration-500` +
                                ` group-hover/edit:delay-75 group-hover/edit:duration-500`
                            }
                        >
                            Game Name
                        </h1>
                    </div>
                    <p
                        className={
                            `flex h-full w-full scale-0 justify-center overflow-auto truncate text-xs` +
                            ` group-hover/edit:scale-100 group-hover/edit:whitespace-normal group-hover/edit:px-2 group-hover/edit:pb-2` +
                            ` ${transtions1}`
                        }
                    >
                        Lorem ipsum dolor, sit amet
                        consecteturgroup-hover/edit:px-2group-hover/edit:px-2group-hover/edit:px-2
                    </p>
                    <button
                        className={`flex h-0 w-0 scale-y-0 items-center justify-center truncate rounded-xl bg-background-primaryButton transition-all`}
                    >
                        PLAY
                    </button>
                </div>
                <div
                    className={`flex w-full scale-0 flex-col items-center justify-center truncate rounded-md transition-all delay-75 duration-500`}
                >
                    <div
                        className={`flex h-full w-full items-center justify-around`}
                    >
                        <button className={`truncate`}>easy</button>
                        <button className={`truncate`}>medium</button>
                        <button className={`truncate`}>hard</button>
                    </div>
                    <div
                        className={`flex h-full w-full items-center justify-around`}
                    >
                        <button
                            className={`flex h-6 w-10 items-center justify-center truncate rounded-xl bg-background-primaryButton sm:h-7 sm:w-20`}
                        >
                            settiings
                        </button>
                        <button
                            className={`flex h-6 w-10 items-center justify-center truncate rounded-xl bg-background-primaryButton sm:h-7 sm:w-20`}
                        >
                            scores
                        </button>
                        <button
                            className={`flex h-6 w-10 items-center justify-center truncate rounded-xl bg-background-primaryButton sm:h-7 sm:w-20`}
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
                ` group/edit absolute top-0 z-0 grid h-full w-full grid-rows-[3fr_1fr] overflow-hidden rounded-md border border-background-primaryButton border-opacity-50 shadow-none delay-75 hover:z-10 lg:grid-rows-[8fr_3fr] lg:transition-all lg:duration-500 lg:hover:scale-x-[130%] lg:hover:scale-y-[122.5%] lg:hover:grid-rows-[8fr_4fr] lg:hover:shadow-card` +
                ` before:absolute before:top-0 before:left-0 before:z-[-1] before:h-full before:w-full before:bg-violet-600 before:opacity-0 before:transition-all before:delay-75 before:duration-500 before:content-[""] hover:before:opacity-100`
            }
        >
            {cardContent}
        </div>
    );
};
export default Card;
