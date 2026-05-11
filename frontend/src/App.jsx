import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PageNotFound from './Pages/PageNotFound'
import Certificate from './Components/Certificate'
import DashboardDonor from './Pages/Donor/DashboardDonor'
import EditProfile from './Pages/Donor/EditProfile'
import HealthTips from './Pages/Donor/HealthTips'




const App = () => {
  return (
     
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/certificate' element={<Certificate/>}/>
      <Route path='/donor' element={<DashboardDonor/>}/>
      <Route  path='/donor/edit-profile' element={<EditProfile/>}/>
      <Route path='/health-tips' element={<HealthTips/>}/>


      



    </Routes>
    
   
  )
}

export default App
