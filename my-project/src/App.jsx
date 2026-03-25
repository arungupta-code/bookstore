import React from 'react'
import Home from './Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Courses from './courses/Courses'
import Signup from './component/Signup'
import  { Toaster } from 'react-hot-toast';
import { useAuth } from './context/Authprovider'
import Papers from './papers/Papers'
import Saveds from './downloads/Saveds'
import McqPage from './mcq/McqPage'
import UB from './pages/UB'
import UP from  './pages/Up'

const App = () => {
  const [authUser,setAuthUser]=useAuth();
  return (
   <>
   <div className='dark:bg-slate-900 dark:text-white'>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course' element={authUser ?<Courses />: <Navigate to={"/signup"}/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/paper'  element={authUser ?<Papers />: <Navigate to={"/signup"}/>} />
      <Route path='/saved'  element={authUser ?<Saveds />: <Navigate to={"/signup"}/>} />
      <Route path='/mcq/:subjectId' element={<McqPage />} />
 {/* 🔥 ADMIN ROUTES */}
  <Route
    path="/admin/upload-paper"
    element={
     authUser && authUser.role === "ADMIN"
        ? <UP/>
        : <Navigate to="/" />
    }
  />

  <Route
    path="/admin/upload-book"
    element={
      authUser && authUser.role === "ADMIN"
        ? <UB/>
        : <Navigate to="/" />
    }
  />
    </Routes>
    <Toaster />
   </div>
   </>
  )
}

export default App

