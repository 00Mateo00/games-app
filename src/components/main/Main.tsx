import React, { useEffect, useContext } from 'react';
import Card from '../card/Card';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Tetris from '../games/tetris/Tetris';
import Pong from '../games/pong/Pong';
import MineSweeper from '../games/mineSweeper/MineSweeper';
import Snake from '../games/snake/Snake';
import BreakOut from '../games/breakOut/BreakOut';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, EffectCreative } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/css/effect-creative';
import GlobalContext from '../../context/GlobalContext';
import Conwey from '../games/conwey/Conwey';

interface props {
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Main: React.FC<props> = ({ scrollRef }) => {
    const { screenWidth } = useContext(GlobalContext);
    const cardData = [
        { component: <Tetris />, image: 'image1.jpg' },
        { component: <Pong />, image: 'image1.jpg' },
        { component: <MineSweeper />, image: 'image1.jpg' },
        { component: <Snake />, image: 'image1.jpg' },
        { component: <BreakOut />, image: 'image1.jpg' },
        { component: <Conwey />, image: 'image1.jpg' },
    ];

    useEffect(() => {
        const element = scrollRef.current;
        if (element === null) return;
        element.addEventListener('wheel', (e) => e.preventDefault(), {
            passive: false,
        });

        return () => {
            if (element === null) return;
            element.removeEventListener('wheel', (e) => e.preventDefault());
        };
    }, []);

    function getCards(n: number): JSX.Element {
        /* const tempArray = Array(n).fill(null); */
        let cardsCollection = <></>;
        if (screenWidth >= 640) {
            cardsCollection = (
                <div
                    className={
                        'relative grid min-h-[calc(100%_-_128px)] w-full grid-flow-row auto-rows-[24rem] grid-cols-[repeat(auto-fit,_18rem)] place-content-center content-center gap-5 py-2'
                    }
                >
                    {cardData.map((e, i) => (
                        <Card key={i} object={cardData[i]} />
                    ))}
                </div>
            );
        } else {
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
                            translate: ['0%', 0, -500],
                            rotate: [0, 0, 0],
                        },
                        next: {
                            shadow: true,
                            translate: ['250%', 0, -500],
                            rotate: [0, 0, 0],
                        },
                    }}
                    modules={[Pagination, EffectCreative]}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className='h-5/6 w-full'
                >
                    <div className='flex h-[calc(100%_-_128px)] w-full items-center justify-center'>
                        {cardData.map((e, i) => (
                            <SwiperSlide key={i}>
                                <Card object={cardData[i]} />
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            );
        }
        return cardsCollection;
    }

    return (
        <div
            className={
                'h-full w-full bg-gradient-to-br from-violet-200 to-violet-900' +
                ' lg:w-[65rem]'
            }
        >
            <div
                ref={scrollRef}
                className={
                    'overflow-6 h-full w-full scrollbar:hidden' +
                    ' sm:overflow-auto'
                }
            >
                <Header />
                {getCards(6)}
                <Footer />
            </div>
        </div>
    );
};

export default Main;
