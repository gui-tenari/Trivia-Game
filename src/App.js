import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameScreen from './pages/GameScreen';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={ GameScreen } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
