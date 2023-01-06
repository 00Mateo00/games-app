import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import Footer from '../footer/Footer';
import Header from '../header/Header';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, EffectCreative } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/css/effect-creative';

interface props {
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Main: React.FC<props> = ({ scrollRef }) => {
    const [width, setWidth] = useState<Number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () =>
                setWidth(window.innerWidth)
            );
        };
    }, []);

    function getCards(n: number, isSwiper: boolean): JSX.Element {
        const tempArray = Array(n).fill(null);
        let cardsCollection = <></>;
        if (isSwiper) {
            cardsCollection = (
                <Swiper
                    slidesPerView={1}
                    grabCursor={true}
                    spaceBetween={30}
                    navigation={true}
                    effect={'creative'}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ['0%', 0, -800],
                            rotate: [0, 0, 0],
                        },
                        next: {
                            shadow: true,
                            translate: ['125%', 0, -800],
                            rotate: [0, 0, 360],
                        },
                    }}
                    modules={[Pagination, EffectCreative]}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className='h-5/6 w-full'
                >
                    {tempArray.map((e, i) => (
                        <SwiperSlide key={i}>
                            <Card />
                        </SwiperSlide>
                    ))}
                </Swiper>
            );
        } else {
            cardsCollection = (
                <>
                    {tempArray.map((e, i) => (
                        <div
                            key={i}
                            className='relative flex h-full w-full items-center'
                        >
                            <Card index={i} />
                        </div>
                    ))}
                </>
            );
        }
        return cardsCollection;
    }

    const noSwiperCards = (
        <div
            className={
                'relative grid min-h-[calc(100%_-_128px)] w-full grid-flow-row auto-rows-[24rem] grid-cols-[repeat(auto-fit,_18rem)] place-content-center content-center gap-5 py-2'
            }
        >
            {getCards(13, false)}
        </div>
    );

    const swiperCards = (
        <div className='flex h-[calc(100%_-_128px)] w-full items-center justify-center'>
            {getCards(13, true)}
        </div>
    );

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
                {width >= 640 && noSwiperCards}
                {width < 640 && swiperCards}
                <Footer />
            </div>
        </div>
    );
};

export default Main;
