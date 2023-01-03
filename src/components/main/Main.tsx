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
        <div className='h-full w-1/2 bg-gradient-to-br from-violet-200 to-violet-900 pt-11'>
            <div className='h-full w-full overflow-auto'>
                <Header />
                <div className='grid auto-rows-[24rem] grid-cols-3 gap-3 py-2 px-14'>
                    {testDivs(12)}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Main;
