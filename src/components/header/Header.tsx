import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='w-full lg:w-4/5 lg:m-auto h-10 sm:h-14 lg:h-20 p-2 sm:p-5 flex justify-between items-center'>
            <div className='h-fit'>
                <button className='bg-background-primaryButton rounded-xl w-10 sm:w-20 h-6 sm:h-7 flex items-center justify-center'>
                    HOME
                </button>
            </div>
            <div className='w-24 sm:w-32 lg:w-36 flex justify-between'>
                <a href=''>INSTAGRAM</a>
                <a href=''>GIHUB</a>
            </div>
        </header>
    );
};

export default Header;
