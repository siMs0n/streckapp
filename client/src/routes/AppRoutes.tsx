import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PinPage from '../pages/PinPage';
import * as paths from './paths';
import useAdminAuth from '../hooks/useAdminAuth';
import PersonsPage from '../pages/admin/PersonsPage';
import ProductsPage from '../pages/admin/ProductsPage';
import PaymentsPage from '../pages/admin/PaymentsPage';
import PurchasesPage from '../pages/admin/PurchasesPage';
import SettingsPage from '../pages/admin/SettingsPage';
import InstancesPage from '../pages/InstancesPage';
import AdminInstancesPage from '../pages/admin/AdminInstancesPage';

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path={paths.baseUrl} component={InstancesPage} />
      <Route path={paths.baseInstanceUrl} component={InstanceRoutes} />
      <Route exact path={paths.loginUrl} component={LoginPage} />
      <Route path={paths.adminBaseUrl} component={AdminRoutes} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

const InstanceRoutes = () => {
  return (
    <Switch>
      <Redirect exact path={paths.instanceUrl} to={paths.homeUrl} />
      <Route exact path={paths.homeUrl} component={HomePage} />
      <Route exact path={paths.pinUrl} component={PinPage} />
    </Switch>
  );
};

const AdminRoutes = () => {
  useAdminAuth();
  return (
    <Switch>
      <Redirect
        exact
        path={paths.adminBaseUrl}
        to={paths.adminBaseInstanceUrl}
      />
      <Route
        exact
        path={paths.adminBaseInstanceUrl}
        component={AdminInstancesPage}
      />
      <Route path={paths.adminInstanceUrl} component={AdminInstanceRoutes} />
    </Switch>
  );
};

const AdminInstanceRoutes = () => {
  return (
    <Switch>
      <Redirect
        exact
        path={paths.adminInstanceUrl}
        to={paths.adminPersonsUrl}
      />
      <Route exact path={paths.adminPersonsUrl} component={PersonsPage} />
      <Route exact path={paths.adminProductsUrl} component={ProductsPage} />
      <Route exact path={paths.adminPaymentsUrl} component={PaymentsPage} />
      <Route exact path={paths.adminPurchasesUrl} component={PurchasesPage} />
      <Route exact path={paths.adminSettingsUrl} component={SettingsPage} />
    </Switch>
  );
};
