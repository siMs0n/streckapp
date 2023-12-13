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
      <Route path={paths.baseUrl} element={<InstancesPage />} />
      <Route path={paths.baseInstanceUrl} element={<InstancesPage />} />
      <Route path={`${paths.instanceUrl}*`} element={<InstanceRoutes />} />
      <Route path={paths.loginUrl} element={<LoginPage />} />
      <Route path={`${paths.adminBaseUrl}*`} element={<AdminRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

const InstanceRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" replace />} />
      <Route path="home" element={<HomePage />} />
      <Route path="pin" element={<PinPage />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  useAdminAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="instance" replace />} />

      <Route path="instance" element={<AdminInstancesPage />} />
      <Route
        path={`instance/:instanceId/*`}
        element={<AdminInstanceRoutes />}
      />
    </Routes>
  );
};

const AdminInstanceRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="persons" replace />} />
      <Route path="persons" element={<PersonsPage />} />
      <Route path="product-categories" element={<ProductCategoriesPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="payments" element={<PaymentsPage />} />
      <Route path="purchases" element={<PurchasesPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
};
