import React, { useState, useContext } from 'react';
import Image from '../../assets/card-Images/tetris.png';
import GlobalContext from '../../context/GlobalContext';

interface props {
    index?: number;
}

const Card: React.FC<props> = (index) => {
    const { setIsSomeCardClicked } = useContext(GlobalContext);

    const [styles, setStyles] = useState<object | undefined>(undefined);

    function getStyles(
        element: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): object {
        const top = element.currentTarget?.getBoundingClientRect()?.top;
        const leftOffset = element.currentTarget?.offsetLeft;
        const parentWidth = element.currentTarget.parentElement?.clientWidth;

        if (
            leftOffset !== undefined &&
            parentWidth !== undefined &&
            top !== undefined
        ) {
            return {
                transform: `translate(-${leftOffset}px, -${top}px)`,
                width: `${parentWidth}px`,
                height: `${window.innerHeight}px`,
                zIndex: 100,
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
                        `h-full w-full` +
                        ` sm:group-hover/edit:grid-rows-[1fr_1fr_0fr]` +
                        `${transtions1}` +
                        ` ${
                            isCardFullSize()
                                ? 'flex flex-col justify-around p-5'
                                : 'grid grid-rows-[1fr_0fr_0fr]'
                        }`
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
                                ` sm:group-hover/edit:text-3xl sm:group-hover/edit:delay-75 sm:group-hover/edit:duration-500`
                            }
                        >
                            Game Name
                        </h1>
                    </div>
                    <p
                        className={
                            `flex h-full w-full scale-0 justify-center overflow-auto ` +
                            ` sm:group-hover/edit:scale-100 sm:group-hover/edit:whitespace-normal sm:group-hover/edit:px-2 sm:group-hover/edit:pb-2` +
                            ` ${transtions1}` +
                            ` ${
                                isCardFullSize()
                                    ? ' scale-100 text-xl'
                                    : ' truncate text-xs'
                            }`
                        }
                    >
                        Lorem ipsum dolor, sit amet
                        consecteturgroup-hover/edit:px-2group-hover/edit:px-2group-hover/edit:px-2
                    </p>
                    <button
                        className={
                            `flex items-center justify-center rounded-xl bg-background-primaryButton transition-all` +
                            ` ${
                                isCardFullSize()
                                    ? ' h-7 w-20 scale-100'
                                    : 'h-0  w-0 scale-0 truncate '
                            }`
                        }
                    >
                        PLAY
                    </button>
                </div>
                <div
                    className={
                        ` ${
                            isCardFullSize()
                                ? 'scale-x-100 scale-y-100'
                                : 'scale-x-0 scale-y-100'
                        }` +
                        ` flex w-full flex-col items-center justify-center truncate rounded-md bg-orange-500 transition-all delay-75 duration-500`
                    }
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
            onClick={(e) => {
                if (isCardFullSize()) {
                    setIsSomeCardClicked(false);
                    setStyles(undefined);
                } else {
                    setIsSomeCardClicked(true);
                    setStyles(getStyles(e));
                }
            }}
            className={
                ` ${isCardFullSize() ? ' z-50' : 'z-10'}` +
                `   relative flex h-full w-full items-center` +
                ` ${transtions1}` +
                ` sm:hover:z-50`
            }
            style={styles}
        >
            <div
                className={
                    ` ${
                        isCardFullSize() ? '' : ' group/edit'
                    } z-15 absolute top-0 grid h-full w-full grid-rows-[3fr_1fr] overflow-hidden rounded-md border border-background-primaryButton border-opacity-50 shadow-none delay-75 sm:grid-rows-[8fr_3fr] ` +
                    ' sm:w-full' +
                    ` sm:transition-all sm:duration-500  ${
                        isCardFullSize()
                            ? ' scale-x-[70%] sm:scale-y-[85%]'
                            : ' sm:hover:scale-x-[130%] sm:hover:scale-y-[122.5%] sm:hover:grid-rows-[8fr_4fr] sm:hover:shadow-card'
                    }` +
                    ` before:absolute before:top-0 before:left-0 before:z-[-1] before:h-full before:w-full before:bg-violet-600 before:opacity-0 before:transition-all before:delay-75 before:duration-500 before:content-[""] hover:before:opacity-100`
                }
            >
                {cardContent}
            </div>
        </div>
    );
};
export default Card;
