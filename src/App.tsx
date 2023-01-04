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
            className='w-screen h-screen flex justify-center items-center bg-neutral-900 relative overflow-hidden'
        >
            <Main scrollRef={scrollRef} />
        </div>
    );
}

export default App;
