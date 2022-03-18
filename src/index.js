import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Resume from './Resume.js';
import { Signin, Signout } from './Signin.js';
import { AuthProvider } from './context.js'
import EditCareer from './EditCareer.js'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider home="/" sign="/signin">
        <Routes>
          <Route path="/" element={<Resume />}>
            <Route path="/careers/:id" element={<EditCareer />}/>
          </Route>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/signout" element={<Signout />}/>
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
