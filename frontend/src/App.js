
import React, { useEffect } from 'react'
import "./index.css"
import {Route,Routes, useNavigate}from "react-router-dom"
import Home from './container/Home'
import Login from './components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'


const App = () => {
  const navigate = useNavigate();

 
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}> 
   <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/*" element={<Home/>}/>
   </Routes>
  </GoogleOAuthProvider>
  )
}

export default App
