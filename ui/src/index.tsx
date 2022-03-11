import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import { AppRoutes } from 'app.routes';
import theme from 'definitions/chakra/theme';
import { BrowserRouter } from 'react-router-dom';
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

export const AppContext = createContext({ cookies });

const Index: React.FC = () => {
  return (
    <AppContext.Provider value={{ cookies }}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <AppRoutes />
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
reportWebVitals();
