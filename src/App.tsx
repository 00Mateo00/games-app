import './App.scss';

function App(): JSX.Element {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-neutral-900 relative overflow-hidden'>
            <header className='absolute top-0 h-11 w-full bg-purple-900'></header>
            <div className='h-full w-1/2 bg-violet-500 py-11'>
                <div className='h-full w-full overflow-auto bg-slate-500 p-20'>
                    <div className='bg-blue-500 w-full h-11'></div>
                    <div className='grid auto-rows-[23rem] grid-cols-3 gap-3 p-5'>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                        <div className='h-full w-full bg-amber-300 transition-all hover:scale-125'></div>
                    </div>
                </div>
                <footer className='h-11 w-full bg-orange-500'></footer>
            </div>
        </div>
    );
}

export default App;
