import React, { useEffect, useState } from 'react'
import { HiH1 } from 'react-icons/hi2'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Dashbord from './Pages/Dashboard';
import SideMenu from './Component/SideMenu';
import CategoryProduct from './Pages/CategoryProduct';
import Categories from './Pages/Categories';
import { useCategories } from './Pages/Store';

export default function App() {
  //to Show SideMenu

  const {data:categories}=useCategories()
  let catsRoutes = categories.map((el)=> {return "/order/" + el.path})
  let acceptedRoutes = ["/order", "/settings", "/bills", "/", ...catsRoutes]
  const [path, setPath] = useState()
  const location = useLocation()
  // let url = window.location.href;
  // let path = url.split("/")[3];
  useEffect(() => {
    setPath(location.pathname)
  }, [location.pathname])

  return (
    <div className='App col-12 d-flex flex-row'>
      {acceptedRoutes.includes(path) && <SideMenu />}
      <Routes>
        <Route path='/' element={<Dashbord />} />
        <Route path='/order' element={<Categories/>} />
        <Route path='/order/:catName' element={<CategoryProduct />} />
        <Route path='/settings' element={<h1>Settings</h1>} />
        <Route path='/bills' element={<h1>Bills</h1>} />
        <Route path='/login' element={<h1>Login page</h1>} />
        <Route path='*' element={<h1>Error page</h1>} />
      </Routes>

    </div>
  )
}
//Routes
//Main Layout
//Main Components