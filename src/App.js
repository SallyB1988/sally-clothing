import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSIgnUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';

import './App.scss';

function App() {
  return (
    <div>
      <Header />
      <Switch >
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SignInAndSIgnUp} />
      </Switch>
    </div>
  );
}

export default App;
