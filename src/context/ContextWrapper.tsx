import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

interface Props {
    children: React.ReactNode;
}

export default function ContextWrapper({ children }: Props): JSX.Element {
    const [value, setValue] = useState<number>(5);

    return (
        <GlobalContext.Provider
            value={{
                value,
                setValue,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
