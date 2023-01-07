import React from 'react';

interface props {
    isSomeCardClicked: boolean;
    setIsSomeCardClicked: React.Dispatch<React.SetStateAction<boolean>>;
    screenWidth: Number;
    setScreenWidth: React.Dispatch<React.SetStateAction<Number>>;
}

const GlobalContext = React.createContext<props>({
    isSomeCardClicked: false,
    setIsSomeCardClicked: () => {},
    screenWidth: 0,
    setScreenWidth: () => {},
});

export default GlobalContext;
