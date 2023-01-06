import React, { useState, useEffect } from 'react';
import Image from '../../assets/card-Images/tetris.png';

interface props {
    index?: number;
}

const Card: React.FC<props> = ({ index }) => {
    const [styles, setStyles] = useState<object | undefined>(undefined);
    useEffect(() => {
        console.log(Boolean(styles));
    }, [styles]);

    function getStyles(
        element: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): object {
        const { clientWidth, clientHeight } = element.currentTarget;
        const top =
            element.currentTarget.parentElement?.getBoundingClientRect()?.top;
        const leftOffset = element.currentTarget.parentElement?.offsetLeft;
        const parentWidth =
            element.currentTarget.parentElement?.parentElement?.clientWidth;

        if (
            leftOffset !== undefined &&
            parentWidth !== undefined &&
            top !== undefined
        ) {
            const toTranslateY =
                window.innerHeight / 2 - clientHeight / 2 - top;
            const toTranslateX = parentWidth / 2 - clientWidth / 2 - leftOffset;

            const scaleX = (parentWidth / clientWidth) * 0.85;
            console.log(scaleX);

            const scaleY = (window.innerHeight / clientHeight) * 0.99;

            return {
                transform: `translate(${toTranslateX}px,${toTranslateY}px) scale(${scaleX}, ${scaleY})`,
            };
        }

        return {};
    }

    function isCardFullSize(): boolean {
        return styles !== undefined;
    }

    const transtions1 = ` transition-all delay-75 duration-500`;
    const beforePseudoElement =
        ' before:hidden' +
        ' sm:before:block sm:before:absolute sm:before:top-0 sm:before:left-0 before:z-[-1] sm:before:h-full sm:before:w-full sm:before:bg-gradient-to-br sm:before:from-violet-600 sm:before:to-violet-800 sm:before:opacity-0 ' +
        ' sm:group-hover/edit:before:content-[""] sm:group-hover/edit:before:opacity-100 sm:before:transition-all sm:before:delay-75 sm:before:duration-500';

    const cardContent = (
        <>
            <img
                src={Image}
                alt='GameName'
                className={
                    `${transtions1}` +
                    ` h-full w-full overflow-hidden object-cover object-[50%_10%]` +
                    ` sm:group-hover/edit:opacity-[95%]`
                }
            ></img>
            <div
                className={
                    `relative z-[1] grid h-full w-full grid-cols-[6fr_0fr] bg-purple-900 ` +
                    ` ${beforePseudoElement}` +
                    ` ${transtions1}` +
                    ` ${isCardFullSize() ? ' grid-cols-[6fr_5fr]' : ''}`
                }
            >
                <div
                    className={
                        `grid h-full w-full grid-rows-[1fr_0fr_0fr]` +
                        ` sm:group-hover/edit:grid-rows-[1fr_1fr_0fr]` +
                        `${transtions1}` +
                        ` ${isCardFullSize() ? 'grid-rows-[1fr_1fr_1fr]' : ''}`
                    }
                >
                    <div
                        className={
                            `grid h-full w-full grid-cols-[1fr_0fr] place-items-center transition-all` +
                            `  sm:group-hover/edit:grid-cols-[auto_1fr] sm:group-hover/edit:p-2` +
                            ` ${transtions1}` +
                            ` ${
                                isCardFullSize()
                                    ? 'block h-min place-items-baseline'
                                    : ''
                            }`
                        }
                    >
                        <h1
                            className={
                                `transition-all delay-100 duration-700` +
                                ` sm:group-hover/edit:text-3xl sm:group-hover/edit:delay-75 sm:group-hover/edit:duration-500` +
                                ` ${isCardFullSize() ? 'text-3xl' : ''}`
                            }
                        >
                            Game Name
                        </h1>
                    </div>
                    <p
                        className={
                            `flex h-full w-full scale-0 justify-center overflow-auto truncate text-xs` +
                            ` sm:group-hover/edit:scale-100 sm:group-hover/edit:whitespace-normal sm:group-hover/edit:px-2 sm:group-hover/edit:pb-2` +
                            ` ${transtions1}` +
                            ` ${
                                isCardFullSize()
                                    ? ' scale-100 whitespace-normal leading-3'
                                    : ''
                            }`
                        }
                    >
                        Lorem ipsum dolor, sit amet
                        consecteturgroup-hover/edit:px-2group-hover/edit:px-2group-hover/edit:px-2
                    </p>
                    <button
                        className={
                            `flex h-0 w-0 scale-y-0 items-center justify-center truncate rounded-xl bg-background-primaryButton transition-all` +
                            ` ${
                                isCardFullSize()
                                    ? 'h-full w-full scale-100'
                                    : ''
                            }`
                        }
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
    return (
        <div
            onClick={(e) => setStyles(getStyles(e))}
            className={
                `  ${
                    isCardFullSize() ? 'z-[100]' : 'group/edit hover:z-10 '
                } absolute top-0 z-0 grid h-full w-full grid-rows-[3fr_1fr] overflow-hidden rounded-md border border-background-primaryButton border-opacity-50 shadow-none delay-75  sm:grid-rows-[8fr_3fr] ` +
                ' sm:w-full' +
                ` sm:transition-all sm:duration-500  ${
                    isCardFullSize()
                        ? ''
                        : 'sm:hover:scale-x-[130%] sm:hover:scale-y-[122.5%] sm:hover:grid-rows-[8fr_4fr] sm:hover:shadow-card'
                }` +
                ` before:absolute before:top-0 before:left-0 before:z-[-1] before:h-full before:w-full before:bg-violet-600 before:opacity-0 before:transition-all before:delay-75 before:duration-500 before:content-[""] hover:before:opacity-100`
            }
            style={styles}
        >
            {cardContent}
        </div>
    );
};
export default Card;
