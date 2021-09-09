import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { FeedbackPage, GameScreen, Login, SettingsPage, Ranking } from './pages';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/feedback" component={ FeedbackPage } />
        <Route path="/game" component={ GameScreen } />
        <Route path="/settings" component={ SettingsPage } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
