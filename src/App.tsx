import './app.module.scss';
import {Home} from './components/Home';


export const App = () => {
  return (
    <div className="App" data-testid="App">
      <Home isLogged={true}/>
    </div>
  );
}

export default App;
