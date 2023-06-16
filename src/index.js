import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './routes/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from './routes/root';
import Take from './routes/Take';
import Create from './routes/Create';
import SignUp from './routes/SignUp';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path='/takepoll' element={<Take />} />
        <Route path='/createpoll' element={<Create />} />
        <Route path='/penis' element={<App />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
