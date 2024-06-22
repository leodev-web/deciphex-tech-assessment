import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import ErrorPage from './components/ErrorPage';
import CaseTablePage from './components/CaseTablePage';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <CaseTablePage tabelType="All cases" />,
      },
      {
        path: '/pending',
        element: <CaseTablePage tabelType="Pending Cases" />,
      },
      {
        path: '/accepted',
        element: <CaseTablePage tabelType="Accepted Cases" />,
      },
      {
        path: '/rejected',
        element: <CaseTablePage tabelType="Rejected Cases" />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
