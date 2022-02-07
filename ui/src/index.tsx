import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import { ShowPack } from 'components/audio/pack.show';
import EditUser from 'components/user/user.edit';
import theme from 'definitions/chakra/theme';
import { KabaflowLayout } from 'layouts/kabaflow.layout';
import Home from 'pages/home.page';
import { NewAudioPage } from 'pages/newAudio.page';
import { PackPage } from 'pages/pack.page';
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
