import React from 'react';

const GlobalContext = React.createContext({
    value: 0,
    setValue: (n: number) => {},
});

export default GlobalContext;
