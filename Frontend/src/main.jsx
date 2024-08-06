import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import UploadPost from './components/Uploadpost.jsx'
import Singlepostpage from './components/Singlepostdeteails.jsx'





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
