import React from 'react'
import styles from './index.module.css'
import NavHeader from '../../Component/NavHeader'
import { useCategories } from '../Store'
import { useNavigate } from 'react-router-dom'
export default function Categories() {
  const { data: appCategories, setActiveId } = useCategories()
  const navigate = useNavigate()
  const handeleClick = (path, cat_id) => {  // هنا اللي هيتمرر المسار بتاع كل كاتيجوري يعني مسار ال البيتزات كلهم البرجرات وهكزا
    setActiveId(cat_id)
    navigate(path)
  }
  
  return (
    <div className={styles.CategoriesPage + " flex-grow-1  "}>
      <NavHeader tabName={"Categories"} />
      <div className='container col-12 d-flex flex-wrap gap-4 justify-content-center'>
        {
          appCategories.map((el) => (
            <div key={el.documentId} className='col-10 col-md-6 col-lg-3 d-flex p-3 ' onClick={(() => handeleClick(el.path, el.documentId))}>
              <div className={styles.productCard + ' rounded-5 shadow col-12 d-flex flex-column justify-content-center align-items-center gap-2 p-5 '}>
                <img src={el.imgUrl} alt="" />
                <p>{el.name}</p>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}
