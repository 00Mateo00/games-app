import React from 'react';
import Header from '../header/Header';
import Card from '../card/Card';
import Footer from '../footer/Footer';

const Main: React.FC = () => {
    return (
        <div className='w-full md:w-5/6 h-full lg:w-4/6 xl:w-3/5 2xl:w-1/2 overflow-auto bg-background-1'>
            <div className='w-full h-[calc(100%-7rem)] pt-10 flex justify-center'>
                <div className='w-[90%] h-full'>
                    <Header />
                    <Card />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
