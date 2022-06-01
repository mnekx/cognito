import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignedoutHome from "./features/signed-out-home/SignedoutHomeComp";
import SignedinHome from "./features/signed-in-home/SignedinHomeComp";
import Testing from "./features/testing/TestingComp";
import Contribution from "./features/contribution/ContributionComp";
import ProblemList from "./features/problem-list/ProblemListComp";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
            <Route index element={<SignedoutHome />}></Route>
            <Route path='user/home' element={<SignedinHome />}>
              <Route path='take-test' element={<Testing />}></Route>
              <Route path='contribute' element={<Contribution />}></Route>
              <Route path="problems" element={<ProblemList/>}></Route>
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
