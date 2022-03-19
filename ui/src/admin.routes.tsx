import CarouselResource from 'admin/carousel.admin';
import Dashboard from 'admin/dashboard.admin';
import GrantResource from 'admin/grant.admin';
import JobResource from 'admin/job.admin';
import LoopResource from 'admin/loop.admin';
import PackResource from 'admin/pack.admin';
import PaymentResource from 'admin/payment.admin';
import PaymentplanResource from 'admin/paymentplan.admin';
import UserResource from 'admin/user.admin';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { RequireAuth } from 'state/user';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="users"
        element={
          <RequireAuth>
            <UserResource />
          </RequireAuth>
        }
      />
      <Route
        path="packs"
        element={
          <RequireAuth>
            <PackResource />
          </RequireAuth>
        }
      />
      <Route
        path="loops"
        element={
          <RequireAuth>
            <LoopResource />
          </RequireAuth>
        }
      />
      <Route
        path="jobs"
        element={
          <RequireAuth>
            <JobResource />
          </RequireAuth>
        }
      />
      <Route
        path="payplans"
        element={
          <RequireAuth>
            <PaymentplanResource />
          </RequireAuth>
        }
      />
      <Route
        path="payments"
        element={
          <RequireAuth>
            <PaymentResource />
          </RequireAuth>
        }
      />
      <Route
        path="grants"
        element={
          <RequireAuth>
            <GrantResource />
          </RequireAuth>
        }
      />
      <Route
        path="carousels"
        element={
          <RequireAuth>
            <CarouselResource />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
