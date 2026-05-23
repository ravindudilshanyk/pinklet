import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './config/runtime';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
