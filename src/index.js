import { React, useContext, createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './routes/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Root from './routes/root';
import Take from './routes/Take';
import Create from './routes/Create';
import SignUp from './routes/SignUp';
import Browse from './routes/Browse';
import View from './routes/View';

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function isLoggedIn() {
  let loggedIn = getCookie("isLoggedIn");
  return loggedIn === "true";
}

const ProtectedRoute = ({
  redirectPath = '/',
  children,
}) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path='/takepoll' element={<ProtectedRoute><Take /></ProtectedRoute>} />
        <Route path='/createpoll' element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path='/penis' element={<App />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/browse' element={<ProtectedRoute><Browse /></ProtectedRoute>} />
        <Route path='/view' element={<ProtectedRoute><View /></ProtectedRoute>} />
        <Route path='/view/:id' element={<ProtectedRoute><View /></ProtectedRoute>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
