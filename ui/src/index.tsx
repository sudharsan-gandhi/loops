import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import JobResource from 'admin/job.admin';
import LoopResource from 'admin/loop.admin';
import PackResource from 'admin/pack.admin';
import PaymentResource from 'admin/payment.admin';
import PaymentplanResource from 'admin/paymentplan.admin';
import UserResource from 'admin/user.admin';
import { ShowPack } from 'components/audio/pack.show';
import EditUser from 'components/user/user.edit';
import theme from 'definitions/chakra/theme';
import { KabaflowLayout } from 'layouts/kabaflow.layout';
import Home from 'pages/home.page';
import JobsPage from 'pages/job.page';
import { NewAudioPage } from 'pages/newAudio.page';
import { PackPage } from 'pages/pack.page';
import { ExploreAudio } from 'pages/pack/audio.explore';
import { ExplorePacks } from 'pages/pack/pack.explore';
import { PayplanPage } from 'pages/payplan.page';
import SignIn from 'pages/signin.page';
import SignUp from 'pages/signup.page';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  LoadAuth,
  RequireAuth,
} from 'state/user';
import Cookie from 'universal-cookie';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import reportWebVitals from './reportWebVitals';

const cookies = new Cookie();

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  credentials: "include",
});

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoadAuth>
            <Home />
          </LoadAuth>
        }
      />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="explore" element={<ExplorePacks />} />
      <Route path="explore/audio" element={<ExploreAudio />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <EditUser />
          </RequireAuth>
        }
      />
      <Route
        path="pack"
        element={
          <RequireAuth>
            <PackPage />
          </RequireAuth>
        }
      />

      <Route
        path="pack/:id"
        element={
          <LoadAuth>
            <ShowPack />
          </LoadAuth>
        }
      />
      <Route
        path="new-pack"
        element={
          <RequireAuth>
            <NewAudioPage />
          </RequireAuth>
        }
      />
      <Route path="payplans" element={<PayplanPage />} />
      <Route path="jobs" element={<JobsPage />} />
      <Route path="admin">
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
      </Route>
    </Routes>
  );
};
export const AppContext = createContext({ cookies });

const Index: React.FC = () => {
  return (
    <AppContext.Provider value={{ cookies }}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <KabaflowLayout />
          </BrowserRouter>
        </ChakraProvider>
      </ApolloProvider>
    </AppContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
