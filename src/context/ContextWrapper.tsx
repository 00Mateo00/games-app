import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';

interface Props {
    children: React.ReactNode;
}

export default function ContextWrapper({ children }: Props): JSX.Element {
    const [isSomeCardClicked, setIsSomeCardClicked] = useState(false);
    const [screenWidth, setScreenWidth] = useState<Number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () =>
            setScreenWidth(window.innerWidth)
        );
        return () => {
            window.removeEventListener('resize', () =>
                setScreenWidth(window.innerWidth)
            );
        };
    }, []);
    return (
        <GlobalContext.Provider
            value={{
                isSomeCardClicked,
                setIsSomeCardClicked,
                screenWidth,
                setScreenWidth,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
