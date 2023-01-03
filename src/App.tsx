import './App.scss';
import Main from './components/main/Main';

function App(): JSX.Element {
    return (
        <div className='w-screen h-screen flex justify-center bg-neutral-900 relative overflow-hidden'>
            <header className='w-full h-14 bg-background-alternative absolute z-50'></header>
            <Main />
        </div>
    );
}

export default App;
