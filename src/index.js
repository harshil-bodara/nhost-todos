import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NhostApolloProvider } from '@nhost/react-apollo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NhostApolloProvider graphqlUrl={process.env.REACT_APP_NHOST_GRAPHQL_ENDPOINT}>
    <App />
    </NhostApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
