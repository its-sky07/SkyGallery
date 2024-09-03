import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import App from './App.jsx'

const Home =lazy(()=>import('./components/Home.jsx'))
const Register =lazy(()=>import('./components/Register.jsx'))
const Profile =lazy(()=>import('./components/Profile.jsx'))
const Login =lazy(()=>import('./components/Login.jsx'))
const UploadPost =lazy(()=>import('./components/Uploadpost.jsx'))
const Singlepostpage =lazy(()=>import('./components/Singlepostdeteails.jsx'))





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >,
    <Route path='' element={<Home/>} />
    <Route path='Register' element={<Register />} />,
    <Route path='Login' element={<Login/>} />
    <Route path='Profile' element={<Profile/>} />
    <Route path='UploadPost' element={<UploadPost/>} />
    <Route path='Singlepostpage/:postid' element={<Singlepostpage/>} />
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider   router={router}/>
  </React.StrictMode>,
)
