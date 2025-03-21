import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import NavHeader from '../../Component/NavHeader'
import { useCategories } from '../Store'
import { useNavigate } from 'react-router-dom'
import { getData } from '../../API/GetData'
import SideCart from '../../Component/SideCart'
export default function Categories() {
  const { setActiveId ,domain ,data :appCategories} = useCategories()
  // const [appCategories,setAppCategories] =useState([])
  const navigate = useNavigate()
  const handeleClick = (documentId) => {  // هنا اللي هيتمرر المسار بتاع كل كاتيجوري يعني مسار ال البيتزات كلهم البرجرات وهكزا
    setActiveId(documentId)
    navigate(documentId)
  }
  //  useEffect(()=>{
  //   getData(domain).then((res)=>{
  //     setAppCategories(res)
  //      console.log(res)
  //   })
  //  },[])
  return (
    <div className={styles.CategoriesPage + " flex-grow-1  "}>
      <div className={styles.allcategory + ' col-12'}>
        <NavHeader tabName={"Categories"} />
        <div className={styles.CategoriesContainer + ' container col-12 d-flex flex-wrap gap-4 justify-content-center'}>
          
          {
            appCategories.map((el) => ( 
              <div key={el.documentId} className='col-10 col-md-6 col-lg-3 d-flex p-3 ' onClick={(() => handeleClick(el.documentId))}>
                <div className={styles.productCard + ' rounded-5 shadow col-12 d-flex flex-column justify-content-center align-items-center gap-2 p-5 '}>
                  <img src={ ` ${domain}${el.Category_img[0]?.url} `} alt="" />
                  <p>{el.Category_name}</p>
                </div>
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}
