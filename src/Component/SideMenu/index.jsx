import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { FaBriefcase } from 'react-icons/fa'
import { RxDashboard } from 'react-icons/rx'
import { FaBurger } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { HiDocumentCurrencyDollar } from 'react-icons/hi2'
import { VscSettings } from 'react-icons/vsc'
import profile from '../../assets/imgs/Screenshot (28).png'
import { index_userdetails } from '../../API/index_userdetails'
import { useCategories } from '../../Pages/Store'
export default function SideMenu() {
  const [Links] = useState([{ id: 1, name: "Dashboard", icon: <RxDashboard />, path: "/" }, { id: 2, name: "Food and Drinks", icon: <FaBurger />, path: "/order" }, { id: 3, name: "Bills", icon: <HiDocumentCurrencyDollar />, path: "/bills" }, { id: 4, name: "Setting", icon: <VscSettings />, path: "/settings" }])
  const navgaite = useNavigate()
  const [ActiveTab, setActiveTab] = useState()
  const navigate = useNavigate()
  const [UserInfo, setUserInfo] = useState([])
  const { domain } = useCategories()
  useEffect(() => {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if (userInfo) {
      let user_id = userInfo.user_id
      index_userdetails(domain, user_id).then(() => {
         setUserInfo(userInfo)
         console.log(userInfo)
      }).catch(() => {
        sessionStorage.clear()
        navgaite('/login')
      })

    } else {
      sessionStorage.clear()
      navgaite('/login')
    }
  }, [domain, navigate])
  return (
    <div className='d-flex flex-column border-end pb-5 justify-content-between' id={styles.SideMenu}>
      <div className='col-12 d-flex flex-column'>

        <div className='col-12 d-flex align-items-center gap-2 p-4 '>
          <FaBriefcase className={styles.icon} />
          <p className='m-0 fs-4 fw-bold'>Samrt<span id={styles.logo}>POS</span></p>
        </div>
        <div className='col-12  gap-2 d-flex flex-column align-items-center'>
          {
            Links.map((el, index) => (
              <Link to={el.path} onClick={() => setActiveTab(index)} key={el.id} id={ActiveTab == index ? styles.ActiveLink : null} className={styles.Link + ' col-10 nav-link gap-2 rounded-3 p-3 d-flex align-items-center'}>
                {el.icon}
                <p className='m-0'>{el.name}</p>
              </Link>
            ))
          }

        </div>

      </div>
      <div className='col-12 d-flex flex-column  align-items-center gap-2 '>
        <img src={profile} width={80} alt="" />
        <h3 className='m-0'>{UserInfo.user_name}</h3>
        <p className='m-0'>{UserInfo.user_role}</p>
        <button className='btn btn-primary' onClick={() => { sessionStorage.clear(), navgaite("/login") }}>Lohout</button>
      </div >
    </div>
  )
}
