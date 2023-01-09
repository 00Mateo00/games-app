import { useRef, useContext } from 'react';
import './App.scss';
import Games from './components/games/Games';
import Main from './components/main/Main';
import GlobalContext from './context/GlobalContext';

function App(): JSX.Element {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { isSomeCardClicked } = useContext(GlobalContext);
    return (
        <div
            onWheel={(e) => {
                if (scrollRef.current === null) return;
                if (isSomeCardClicked) return;
                scrollRef.current.scrollTop += e.deltaY;
            }}
            className='relative flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-900 '
        >
            <Main scrollRef={scrollRef} />
            <Games />
        </div>
    );
}

export default App;
