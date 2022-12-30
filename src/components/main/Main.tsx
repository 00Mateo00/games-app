import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Card from '../card/Card';
import './main.scss';

const Main: React.FC = () => {
    return (
        <div className='w-full md:w-4/6 lg:w-1/2 h-full flex flex-col bg-gradient-to-br bg-background-2'>
            <div className='px-4 sm:w-3/4 md:w-5/6 flex flex-col h-[56rem] overflow-auto self-center justify-end'>
                <header className=' pb-4 '>
                    <Header />
                </header>
                <main className='w-full h-[90%]'>
                    <Card />
                </main>
            </div>
            <footer className='w-full'>
                <Footer />
            </footer>
        </div>
    );
};

export default Main;
