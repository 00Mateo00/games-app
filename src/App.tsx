import './App.scss';
import Main from './components/main/Main';

function App(): JSX.Element {
    return (
        <div className='w-screen h-screen flex justify-center bg-background-optional'>
            <Main />
        </div>
    );
}

export default App;
