import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PinPage from '../pages/PinPage';
import * as paths from './paths';
import useAdminAuth from '../hooks/useAdminAuth';
import PersonsPage from '../pages/admin/PersonsPage';

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path={paths.baseUrl} component={HomePage} />
      <Route exact path={paths.loginUrl} component={LoginPage} />
      <Route exact path={paths.pinUrl} component={PinPage} />
      <Route path={paths.adminBaseUrl} component={AdminRoutes} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

const AdminRoutes = () => {
  useAdminAuth();
  return (
    <Switch>
      <Route exact path={paths.adminPersonsUrl} component={PersonsPage} />
    </Switch>
  );
};
