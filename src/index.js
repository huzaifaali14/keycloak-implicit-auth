import { ApolloProvider } from '@apollo/client/react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import apolloClient from './apolloClient';
import App from './App';
import './index.css';
import keycloak from './keycloak';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactKeycloakProvider authClient={keycloak}>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </ReactKeycloakProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
