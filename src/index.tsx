import React from 'react';
import { Provider } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { configureStore, Action } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';
// Redux
import gameStateReducer from './state';
import { GameState } from './game/types';

import { App } from './app';

// The AppThunk type will help us in writing type definitions for thunk actions
export type AppThunk = ThunkAction<void, GameState, unknown, Action<string>>;

const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
  },
  devTools: process.env.NODE_ENV !== 'development' ? false : true,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
