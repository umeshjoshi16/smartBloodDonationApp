import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PageNotFound from './Pages/PageNotFound'




const App = () => {
  return (
     
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      



    </Routes>
    
   
  )
}

export default App
