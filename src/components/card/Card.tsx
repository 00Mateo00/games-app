/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from 'react';
import Image from '../../assets/card-Images/tetris.png';
import GlobalContext from '../../context/GlobalContext';
import './card.scss';

interface Props {
    object: {
        component: JSX.Element;
        image: string;
        GameName: string;
    };
}

const Card: React.FC<Props> = ({ object }) => {
    const { component, image, GameName } = object;
    const { setIsSomeCardClicked, screenWidth, setInGameView } =
        useContext(GlobalContext);

    const [onClickStyles, setOnClickStyles] = useState<object | undefined>(
        undefined
    );

    const [thisGameInView, setThisGameInView] = useState(false);
    function getStyles(
        element: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): object {
        let customStyles = {};

        const topOffset = element.currentTarget?.getBoundingClientRect()?.top;
        const leftOffset = element.currentTarget?.offsetLeft;
        const parentWidth = element.currentTarget.parentElement?.clientWidth;

        if (parentWidth !== undefined) {
            customStyles = {
                transform: `translate(${leftOffset * -1}px, ${
                    topOffset * -1
                }px)`,
                width: `${parentWidth}px`,
                height: `${window.innerHeight}px`,
                zIndex: 100,
            };
        }

        return customStyles;
    }

    function isCardFullSize(): boolean {
        return onClickStyles !== undefined;
    }

    function isMobile(): boolean {
        return screenWidth >= 640;
    }

    const cardContent = (
        <>
            <div className='relative h-full w-full'>
                <div className='gameDisplay absolute left-0  top-0 z-10 h-full w-full bg-purple-700'>
                    {thisGameInView && component}
                </div>
                <img
                    src={Image}
                    alt='GameName'
                    className={` imagen transitions absolute left-0 top-0 z-20`}
                ></img>
            </div>

            <div
                className={
                    `info-Wrapper transtions` +
                    ` ${
                        isCardFullSize()
                            ? ' info-Wrapper_FullSize'
                            : ' info-Wrapper_SmallSize'
                    }`
                }
            >
                <div
                    className={
                        `info-grid transtions` +
                        ` ${
                            isCardFullSize()
                                ? 'info-grid_FullSize'
                                : 'info-grid_SmallSize'
                        }`
                    }
                >
                    <div
                        className={
                            `h1-wrapper transitions` +
                            ` ${isCardFullSize() ? 'h1-wrapper_FullSize' : ''}`
                        }
                    >
                        <h1>{GameName}</h1>
                    </div>
                    <p
                        className={
                            `description transitions` +
                            ` ${
                                isCardFullSize()
                                    ? 'description_FullSize'
                                    : 'description_SmallSize'
                            }`
                        }
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                    </p>
                    <button
                        onClick={() => {
                            setInGameView(true);
                            setThisGameInView(true);
                        }}
                        className={
                            `playButton` +
                            ` ${
                                isCardFullSize()
                                    ? 'playButton_FullSize'
                                    : 'playButton_SmallSize'
                            }`
                        }
                    >
                        PLAY
                    </button>
                </div>
                <div
                    className={
                        `configGrid transitions` +
                        `${
                            isCardFullSize()
                                ? 'configGrid_FullSize'
                                : 'configGrid_SmallSize'
                        }`
                    }
                >
                    <div className={`difficultySelector`}>
                        <button>easy</button>
                        <button>medium</button>
                        <button>hard</button>
                    </div>
                    <div className={`otherSettings`}>
                        <button>settiings</button>
                        <button>scores</button>
                        <button>tutorial</button>
                    </div>
                </div>
            </div>
        </>
    );

    function stylesSwitcher(
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void {
        if (isCardFullSize()) {
            setInGameView(false);
            setThisGameInView(false);
            setIsSomeCardClicked(false);
            setOnClickStyles(undefined);
        } else {
            setIsSomeCardClicked(true);
            setOnClickStyles(getStyles(e));
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
            style={isMobile() ? onClickStyles : undefined}
        >
            <div
                onClick={(e) => {
                    if (isCardFullSize()) e.stopPropagation();
                }}
                className={
                    `CARD-Wrapper transitions` +
                    ` ${
                        isCardFullSize()
                            ? 'CARD-Wrapper_FullSize'
                            : 'CARD-Wrapper_SmallSize'
                    }` +
                    `
                    ${thisGameInView ? 'isGameView' : ''}
                    `
                }
            >
                {cardContent}
            </div>
        </div>
    );
};
export default Card;
