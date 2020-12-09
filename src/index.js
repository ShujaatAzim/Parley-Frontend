import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { verifyCredentials } from './redux-token-auth-config'

const store = createStore(rootReducer, applyMiddleware(thunk))
verifyCredentials(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
    document.getElementById('root'));
