import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header/header';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSIgnUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'

import './App.scss';

class App extends React.Component {

  unsubscribeFromAuth = null
  // onAuthStateChanged is an open subscription.  If auth state changes, this will update the state
  // Because of this, we have to unsubscribe and close it when user logs out
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // close the subscription
  }


  render() {
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
}

// since App doesn't USE currentUser, it only sets the value, we just need to use 
// mapDispatchToProps as the second argument for the connect function

// this defines functions that will dispatch objects.  For example, setCurrentUser
// is a function that will receive a user and invoke the setCurrentUser function defined in 
// user.actions.js passing user as the parameter.  The setCurrentUser function returns an 
// action OBJECT, which is then dispatched.

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
