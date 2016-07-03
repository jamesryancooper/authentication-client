import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Home from './views/Home';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/Dashboard';
import RequireAuth from './hocs/RequireAuth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware( reduxThunk )( createStore );
const store = createStoreWithMiddleware( reducers );

const token = localStorage.getItem( 'token' );

//If we have a token, consider the user to be signed in
if ( token ) {

    // We need to update application state
    store.dispatch( { type: AUTH_USER } );

}

ReactDOM.render(
  <Provider store={ store }>
      <Router history={ browserHistory }>
          <Route path='/' component={ App }>
              <IndexRoute component={ Home } />
              <Route path='signin' component={ SignIn } />
              <Route path='signout' component={ SignOut } />
              <Route path='signup' component={ SignUp } />
              <Route path='dashboard' component={ RequireAuth( Dashboard ) } />
          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));
