import { useRef } from 'react';
import './App.scss';
import Main from './components/main/Main';

function App(): JSX.Element {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    return (
        <div
            onWheel={(e) => {
                if (scrollRef.current !== null) {
                    scrollRef.current.scrollTop += e.deltaY;
                }
            }}
            className='relative flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-900 '
        >
            <Main scrollRef={scrollRef} />
        </div>
    );
}

export default App;
