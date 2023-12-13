import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PinPage from '../pages/PinPage';
import * as paths from './paths';
import useAdminAuth from '../hooks/useAdminAuth';
import PersonsPage from '../pages/admin/PersonsPage';
import ProductsPage from '../pages/admin/ProductsPage/ProductsPage';
import PaymentsPage from '../pages/admin/PaymentsPage';
import PurchasesPage from '../pages/admin/PurchasesPage/PurchasesPage';
import SettingsPage from '../pages/admin/SettingsPage';
import InstancesPage from '../pages/InstancesPage';
import AdminInstancesPage from '../pages/admin/AdminInstancesPage';
import ProductCategoriesPage from '../pages/admin/ProductCategoriesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.baseUrl}>
        <InstancesPage />
      </Route>
      <Route path={paths.baseInstanceUrl}>
        <InstancesPage />
      </Route>
      <Route path={paths.instanceUrl}>
        <InstanceRoutes />
      </Route>
      <Route path={paths.loginUrl}>
        <LoginPage />
      </Route>
      <Route path={paths.adminBaseUrl}>
        <AdminRoutes />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Routes>
  );
}

const InstanceRoutes = () => {
  return (
    <Routes>
      <Route path={paths.instanceUrl}>
        <Navigate to={paths.homeUrl} replace />
      </Route>
      <Route path={paths.homeUrl}>
        <HomePage />
      </Route>
      <Route path={paths.pinUrl}>
        <PinPage />
      </Route>
    </Routes>
  );
};

const AdminRoutes = () => {
  useAdminAuth();
  return (
    <Routes>
      <Route path={paths.adminBaseUrl}>
        <Navigate to={paths.adminBaseInstanceUrl} replace />
      </Route>

      <Route path={paths.adminBaseInstanceUrl}>
        <AdminInstancesPage />
      </Route>
      <Route path={paths.adminInstanceUrl}>
        <AdminInstanceRoutes />
      </Route>
    </Routes>
  );
};

const AdminInstanceRoutes = () => {
  return (
    <Routes>
      <Route path={paths.adminInstanceUrl}>
        <Navigate to={paths.adminPersonsUrl} replace />
      </Route>
      <Route path={paths.adminPersonsUrl}>
        <PersonsPage />
      </Route>
      <Route path={paths.adminProductCategoriesUrl}>
        <ProductCategoriesPage />
      </Route>
      <Route path={paths.adminProductsUrl}>
        <ProductsPage />
      </Route>
      <Route path={paths.adminPaymentsUrl}>
        <PaymentsPage />
      </Route>
      <Route path={paths.adminPurchasesUrl}>
        <PurchasesPage />
      </Route>
      <Route path={paths.adminSettingsUrl}>
        <SettingsPage />
      </Route>
    </Routes>
  );
};
