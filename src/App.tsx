import './App.scss';
import Main from './components/main/Main';

function App(): JSX.Element {
    return (
        <div className='w-screen h-screen flex justify-center content-center bg-background-1'>
            <Main />
        </div>
    );
}

export default App;
