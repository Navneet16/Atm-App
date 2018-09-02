import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components//main.js'
import {BrowserRouter} from 'react-router-dom'
import { createStore , applyMiddleware, compose } from 'redux'
import reducers from './reducers/reducer.js'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(
    reducers,
     compose(
         applyMiddleware(thunk),
         window.devToolsExtension ? window.devToolsExtension() : f => f
     )
   );

ReactDOM.render(
    <Provider store={store}><BrowserRouter><Main/></BrowserRouter></Provider>, document.getElementById('root'));
