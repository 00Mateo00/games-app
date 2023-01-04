import React from 'react';
import Card from '../card/Card';
import Footer from '../footer/Footer';
import Header from '../header/Header';

interface props {
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Main: React.FC<props> = ({ scrollRef }) => {
    function getCards(n: number): JSX.Element {
        return (
            <>
                {Array(n)
                    .fill(null)
                    .map((e, i) => (
                        <div
                            key={i}
                            className='relative flex h-full w-full items-center'
                        >
                            <Card />
                        </div>
                    ))}
            </>
        );
    }
    return (
        <div
            className={
                'h-full w-full bg-gradient-to-br from-violet-200 to-violet-900' +
                ' lg:w-[65rem]'
            }
        >
            <div
                onWheel={(e) => e.stopPropagation()}
                ref={scrollRef}
                className='h-full w-full overflow-auto scrollbar:hidden'
            >
                <Header />
                <div
                    className={
                        'mx-auto grid min-h-[calc(100%_-_128px)] w-[90%] grid-flow-row auto-rows-[24rem] grid-cols-[repeat(auto-fit,_18rem)] place-content-center gap-5 py-2' +
                        ' md:'
                    }
                >
                    {getCards(13)}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Main;
