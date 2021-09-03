import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameScreen from './pages/GameScreen';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import FeedbackPage from './pages/FeedbackPage';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={ GameScreen } />
        <Route path="/settings" component={ SettingsPage } />
        <Route path="/feedback" component={ FeedbackPage } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
