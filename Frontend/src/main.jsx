
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import React, { Suspense } from 'react';

// Lazy load the components
const Register = React.lazy(() => import('./components/Register.jsx'));
const Login = React.lazy(() => import('./components/Login.jsx'));
const Home = React.lazy(() => import('./components/Home.jsx'));
const Profile = React.lazy(() => import('./components/Profile.jsx'));
const UploadPost = React.lazy(() => import('./components/Uploadpost.jsx'));
const Singlepostpage = React.lazy(() => import('./components/singlepostdeteails.jsx'));
const App = React.lazy(() => import('./App.jsx'));




const router = createBrowserRouter(
  createRoutesFromElements(
   <Suspense fallback={<div>Loading...</div>}>
    <Route path='/' element={<App />} >,
    <Route path='' element={<Home/>} />
    <Route path='Register' element={<Register />} />,
    <Route path='Login' element={<Login/>} />
    <Route path='Profile' element={<Profile/>} />
    <Route path='UploadPost' element={<UploadPost/>} />
    <Route path='Singlepostpage/:postid' element={<Singlepostpage/>} />
    </Route>
    </Suspense>

  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider   router={router}/>
  </React.StrictMode>,
)
