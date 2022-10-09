import { ExamplePage } from './pages/ExamplePage';

import './app.module.scss';

export const App = () => {
  return (
    <div className="App" data-testid="App">
      Welcome! Let's start new project.
      <ExamplePage />
    </div>
  );
};

export default App;
