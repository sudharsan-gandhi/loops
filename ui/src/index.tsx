import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import { ShowPack } from 'components/audio/pack.show';
import theme from 'definitions/chakra/theme';
import { KabaflowLayout } from 'layouts/kabaflow.layout';
import { NewAudioPage } from 'pages/newAudio.page';
import { PackPage } from 'pages/pack/pack.page';
import SignIn from 'pages/signin';
import SignUp from 'pages/signup';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Cookie from 'universal-cookie';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import reportWebVitals from './reportWebVitals';

const cookies = new Cookie();

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="pack" element={<PackPage />} />
      <Route path="pack/:id" element={<ShowPack />} />
      <Route path="new-pack" element={<NewAudioPage />} />
    </Routes>
  );
};
export const Cookies = createContext({ cookies });

const Index: React.FC = () => {
  return (
    <Cookies.Provider value={{ cookies }}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <KabaflowLayout />
          </BrowserRouter>
        </ChakraProvider>
      </ApolloProvider>
    </Cookies.Provider>
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
