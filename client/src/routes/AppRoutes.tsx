import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import * as paths from './paths';

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path={paths.baseUrl} component={HomePage} />
      <Route exact path={paths.loginUrl} component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
