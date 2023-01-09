import React from 'react';

import { GameSettings } from '../components/games/mineSweeper/interfaces';

interface Props {
    isSomeCardClicked: boolean;
    setIsSomeCardClicked: React.Dispatch<React.SetStateAction<boolean>>;
    screenWidth: Number;
    setScreenWidth: React.Dispatch<React.SetStateAction<Number>>;
    settings: GameSettings;
    setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
}

const GlobalContext = React.createContext<Props>({
    isSomeCardClicked: false,
    setIsSomeCardClicked: () => {},
    screenWidth: 0,
    setScreenWidth: () => {},
    settings: {},
    setSettings: () => {},
});

export default GlobalContext;
