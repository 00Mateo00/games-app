import React from 'react';
import Card from '../card/Card';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const Main: React.FC = () => {
    function testDivs(n: number): JSX.Element {
        return (
            <>
                {Array(n)
                    .fill(null)
                    .map((e, i) => (
                        <div
                            key={i}
                            className='w-full h-full relative flex items-center'
                        >
                            <Card />
                        </div>
                    ))}
            </>
        );
    }
    return (
        <div className='w-full md:w-5/6 h-max lg:w-4/6 xl:w-3/5 2xl:w-1/2 bg-gradient-to-br from-violet-200 to-violet-900'>
            <div className='w-full h-screen pt-14 flex justify-center items-center flex-col overflow-auto'>
                <div className='w-[90%] h-max'>
                    <Header />
                    <div className='grid gap-x-5 gap-y-2 justify-center items-start grid-cols-3 auto-rows-[24rem] grid-flow-row w-full h-100%'>
                        {testDivs(12)}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
