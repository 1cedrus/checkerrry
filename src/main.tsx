import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider, theme } from '@chakra-ui/react';
import ApisProvider from './providers/ApisProvider.tsx';
import AccountProvider from './providers/AddressProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccountProvider>
      <ApisProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ApisProvider>
    </AccountProvider>
  </React.StrictMode>,
);
