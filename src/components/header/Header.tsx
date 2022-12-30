import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {
    return (
        <div className='header_grid-wrapper'>
            <div className='header-right'>
                <Link to='home'>
                    <button className='bg-violet-900 rounded-lg  py-1 px-2 text-orange-200 shadow-md'>
                        HOME
                    </button>
                </Link>
            </div>
            <div className='header-left'>
                <a href='https://www.instagram.com'>INSTAGRAM</a>
                <a href='https://github.com/00Mateo00'>GITHUB</a>
            </div>
        </div>
    );
};

export default Header;
