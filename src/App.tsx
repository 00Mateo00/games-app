import './App.scss';
import Main from './components/main/Main';

function App(): JSX.Element {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-neutral-900 relative overflow-hidden'>
            <header className='absolute top-0 h-11 w-full bg-purple-900'></header>
            <Main />
        </div>
    );
}

export default App;
