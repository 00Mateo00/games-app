import React from 'react';

interface props {
    isSomeCardClicked: boolean;
    setIsSomeCardClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = React.createContext<props>({
    isSomeCardClicked: false,
    setIsSomeCardClicked: () => {},
});

export default GlobalContext;
