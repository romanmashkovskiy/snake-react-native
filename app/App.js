import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
import Game from './containers/game';

const store =createStore(rootReducer);

const App = () => (
  <Provider store={store}>
      <Game />
  </Provider>
);

export default App;