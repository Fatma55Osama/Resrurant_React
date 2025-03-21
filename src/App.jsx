import React, { useEffect, useState } from 'react'
import { HiH1 } from 'react-icons/hi2'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Dashbord from './Pages/Dashboard';
import SideMenu from './Component/SideMenu';
import CategoryProduct from './Pages/CategoryProduct';
import Categories from './Pages/Categories';
import { useCategories, useSideCart } from './Pages/Store';
import { getData } from './API/GetData';
import SideCart from './Component/SideCart';
import Invoice from './Pages/Invoices';
import Login from './Pages/Login';

export default function App() {
  //to Show SideMenu
  const {Cartmodal} =useSideCart()
  const {data:categories,domain ,setData}=useCategories()
  let catsRoutes = categories.map((el)=> {return "/order/" + el.path})
  const [acceptedRoutes,setAcceptedRoutes] =useState(["/order", "/settings", "/bills", "/"]) 
  const [path, setPath] = useState()
  const location = useLocation()
  // let url = window.location.href;
  // let path = url.split("/")[3];
  useEffect(() => {
    setPath(location.pathname)
  }, [location.pathname])

   useEffect(()=>{
     getData(domain).then((res)=>{
        let cats =res;
    
        let routes = cats.map(el=> '/order/' + el.documentId);
        setAcceptedRoutes([...acceptedRoutes,...routes])
        setData(cats)
        
     })
    },[])
  return (
    <div className='App col-12 d-flex flex-row'>
      {acceptedRoutes.includes(path) && <SideMenu />}
      {Cartmodal && <SideCart/>}
      <Routes>
        <Route path='/' element={<Dashbord />} />
        <Route path='/order' element={<Categories/>} />
        <Route path='/order/:id' element={<CategoryProduct />} />
        <Route path='/settings' element={<h1>Settings</h1>} />
        <Route path='/bills' element={<Invoice/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={<h1>Error page</h1>} />
      </Routes>

    </div>
  )
}
//Routes
//Main Layout
//Main Components