import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='mx-auto flex h-20 w-[91%] items-center justify-between p-2'>
            <div className='h-fit'>
                <button className='flex h-7 w-20 items-center justify-center rounded-xl bg-background-primaryButton'>
                    HOME
                </button>
            </div>
            <div className='flex w-36 justify-between'>
                <a href=''>INSTAGRAM</a>
                <a href=''>GIHUB</a>
            </div>
        </header>
    );
};

export default Header;
