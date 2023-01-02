import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Card from '../card/Card';

const Main: React.FC = () => {
    function testDivs(n: number): JSX.Element {
        return (
            <>
                {Array(n)
                    .fill(null)
                    .map((e, i) => (
                        <div
                            key={i}
                            className='w-full h-[90%] relative flex items-center bg-yellow-300'
                        >
                            <Card />
                        </div>
                    ))}
            </>
        );
    }
    return (
        <div className='w-full md:w-5/6 h-full lg:w-4/6 xl:w-3/5 2xl:w-1/2 overflow-auto bg-gradient-to-br from-violet-200 to-violet-900'>
            <div className='w-full h-[calc(100%-3.5rem)] pt-7 flex justify-center'>
                <div className='w-[90%] h-full'>
                    <Header />
                    <div className='grid gap-5 justify-center items-center grid-cols-3 grid-rows-2 grid-flow-row w-full h-[calc(100%-5rem)]'>
                        {testDivs(6)}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
