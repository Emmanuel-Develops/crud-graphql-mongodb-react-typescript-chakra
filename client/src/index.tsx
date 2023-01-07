import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ColorModeScript } from "@chakra-ui/react"
import theme from 'theme'
import { AuthContextProvider } from 'context/authContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
