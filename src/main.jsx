import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './Pages/Login.jsx';
import Registration from './Pages/Registration.jsx';
import firebaseConfig from './authentication/FirebaseCongin.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Demo from './Pages/Demo.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import store from './store.jsx'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/demo",
    element: <Demo></Demo>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
