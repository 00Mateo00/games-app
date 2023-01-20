/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';
import { GameSettings } from '../components/games/mineSweeper/interfaces';

interface Props {
    children: React.ReactNode;
}

export default function ContextWrapper({ children }: Props): JSX.Element {
    const [isSomeCardClicked, setIsSomeCardClicked] = useState(false);
    const [screenWidth, setScreenWidth] = useState<Number>(window.innerWidth);
    const [settings, setSettings] = useState<GameSettings>({
        difficulty: 'easy',
    });
    const [inGameView, setInGameView] = useState(false);

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
                settings,
                setSettings,
                inGameView,
                setInGameView,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
