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
                        <h1>Game Name</h1>
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
                        Lorem ipsum dolor, sit amet
                        consecteturgroup-hover:px-2group-hover:px-2group-hover:px-2
                    </p>
                    <button
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
                            : 'CARD-Wrapper_SmallSize'
                    }`
                }
            >
                {cardContent}
            </div>
        </div>
    );
};
export default Card;
