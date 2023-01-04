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
                className={
                    'overflow-6 h-full w-full scrollbar:hidden' +
                    ' sm:overflow-auto'
                }
            >
                <Header />
                <div
                    className={
                        'relative grid min-h-[calc(100%_-_128px)] w-full auto-cols-[90%] grid-flow-col grid-rows-[32rem] content-center gap-5 py-2 pl-[10%]' +
                        ' sm:my-0 sm:w-[90%] sm:grid-flow-row sm:auto-rows-[24rem] sm:grid-cols-[repeat(auto-fit,_18rem)] sm:place-content-center'
                    }
                >
                    <div
                        className={
                            'absolute right-0 top-1/2 z-50 flex h-72 w-[15%] -translate-y-1/2 items-center justify-center' +
                            ' sm:hidden'
                        }
                    ></div>
                    {getCards(13)}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Main;
