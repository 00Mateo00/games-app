import React, { useState, useContext } from 'react';
import Image from '../../assets/card-Images/tetris.png';
import GlobalContext from '../../context/GlobalContext';
import './card.scss';

interface props {
    index?: number;
}

const Card: React.FC<props> = (index) => {
    const { setIsSomeCardClicked, screenWidth } = useContext(GlobalContext);

    const [styles, setStyles] = useState<object | undefined>(undefined);

    function getStyles(
        element: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): object {
        const topOffset = element.currentTarget?.getBoundingClientRect()?.top;
        const leftOffset = element.currentTarget?.offsetLeft;
        const parentWidth = element.currentTarget.parentElement?.clientWidth;

        if (
            leftOffset !== undefined &&
            parentWidth !== undefined &&
            topOffset !== undefined
        ) {
            console.log({ topOffset, leftOffset });

            return {
                transform: `translate(${leftOffset * -1}px, ${
                    topOffset * -1
                }px)`,
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

    function isMobile(): boolean {
        return screenWidth >= 640;
    }

    const transtions1 = ` transition-all delay-75 duration-500`;
    const beforePseudoElement =
        ' before:hidden sm:before:block sm:before:absolute sm:before:top-0 sm:before:left-0 before:z-[-1] sm:before:h-full sm:before:w-full sm:before:bg-gradient-to-br sm:before:from-violet-600 sm:before:to-violet-800 sm:before:opacity-0 ' +
        ' sm:group-hover/edit:before:content-[""] sm:group-hover/edit:before:opacity-100 sm:before:transition-all sm:before:delay-75 sm:before:duration-500';

    const cardContent = (
        <>
            <img
                src={Image}
                alt='GameName'
                className={` imagen transitions`}
            ></img>
            <div
                className={
                    `info-Wrapper transtions` +
                    ` ${beforePseudoElement}` +
                    ` ${transtions1}` +
                    ` ${
                        isCardFullSize()
                            ? ' info-Wrapper_FullSize'
                            : ' before:hidden'
                    }`
                }
            >
                <div
                    className={
                        `h-full w-full` +
                        ` sm:group-hover/edit:grid-rows-[1fr_1fr_0fr]` +
                        `${transtions1}` +
                        ` ${
                            isCardFullSize()
                                ? 'sm:flex sm:flex-col sm:justify-around sm:p-5'
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
                                    ? 'sm:block sm:h-min sm:place-items-baseline'
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
                                    ? ' sm:scale-100 sm:text-xl'
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
                                    ? ' sm:h-7 sm:w-20 sm:scale-100'
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
                                ? 'sm:scale-x-100 sm:scale-y-100'
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

    function stylesSwitcher(
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void {
        if (isCardFullSize()) {
            setIsSomeCardClicked(false);
            setStyles(undefined);
        } else {
            setIsSomeCardClicked(true);
            setStyles(getStyles(e));
        }
    }

    return (
        <div
            onClick={(e) => stylesSwitcher(e)}
            className={
                `CARD-ExternalWrapper transitions` +
                ` ${
                    isCardFullSize()
                        ? 'CARD-ExternalWrapper_FullSize'
                        : 'CARD-ExternalWrapper_SmallSize'
                }`
            }
            style={isMobile() ? styles : undefined}
        >
            <div
                className={
                    `CARD-Wrapper` +
                    ` ${
                        isCardFullSize()
                            ? 'CARD-Wrapper_FullSize'
                            : 'CARD-Wrapper_SmallSize group/edit'
                    }`
                }
            >
                {cardContent}
            </div>
        </div>
    );
};
export default Card;
