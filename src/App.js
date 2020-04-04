import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';
import Lyrics from './components/tracks/Lyrics';

//Context
import { AppProvider } from './context';

const App = () => {
  return (
    <AppProvider>
      <Router basename='/react-lyrics-app'>
        <>
          <Navbar />
          <div className='w-full flex flex-col justify-center'>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route exact path='/lyrics/track/:id' component={Lyrics} />
            </Switch>
          </div>
        </>
      </Router>
    </AppProvider>
  );
};

export default App;
