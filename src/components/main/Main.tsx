import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Card from '../card/Card';
import './main.scss';

const Main: React.FC = () => {
    return (
        <div className='main-wrapper'>
            <div className='main-body-wrapper'>
                <header>
                    <Header />
                </header>
                <main>
                    <Card />
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Main;
