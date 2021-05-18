import { useState } from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";

import AppContext from './appContext';
import Routes from './routes';

function App() {
  const [auth, setAuth] = useState(false);
  
  return (
    <div className="App">
      <AppContext.Provider value={{auth, setAuth}}>
        <Router>
          <Routes/>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;

