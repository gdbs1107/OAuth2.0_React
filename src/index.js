import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OAuth2Redirect from './component/OAuth2Redirect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/oauth2-jwt-header" element={<OAuth2Redirect/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
