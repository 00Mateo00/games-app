import React from 'react';
import './header.scss';

const Header: React.FC = () => {
    return (
        <header className='mx-auto flex h-20 w-[91%] items-center justify-between p-2'>
            <div className='h-fit'>
                <button className='primary-button flex h-7 w-20 items-center justify-center rounded-xl'>
                    <a
                        className='home'
                        href='https://00mateo00.github.io/portfolio/'
                    >
                        HOME
                    </a>
                </button>
            </div>
            <div className='flex w-36 justify-between'>
                <a href='https://www.instagram.com/lmateo_ossal/'>INSTAGRAM</a>
                <a href='https://github.com/00Mateo00'>GITHUB</a>
            </div>
        </header>
    );
};

export default Header;
