import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

interface Props {
    children: React.ReactNode;
}

export default function ContextWrapper({ children }: Props): JSX.Element {
    const [isSomeCardClicked, setIsSomeCardClicked] = useState(false);
    return (
        <GlobalContext.Provider
            value={{
                isSomeCardClicked,
                setIsSomeCardClicked,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
