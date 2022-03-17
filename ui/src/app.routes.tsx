import AdminLayout from 'layouts/admin.layout';
import { KabaflowLayout } from 'layouts/kabaflow.layout';
import {
  Route,
  Routes,
} from 'react-router-dom';

export const AppRoutes = () => (
  <Routes>
    <Route path="admin/*" element={<AdminLayout />} />
    <Route path="*" element={<KabaflowLayout />} />
  </Routes>
);
