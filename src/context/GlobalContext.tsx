import React from 'react';

interface props {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

const GlobalContext = React.createContext<props>({
    value: 0,
    setValue: () => {},
});

export default GlobalContext;
