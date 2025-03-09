import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import burger from '../../assets/imgs/CategoriesImgs/Layer 1.png'
import pizza from '../../assets/imgs/CategoriesImgs/Layer 2.png'
import cold from '../../assets/imgs/CategoriesImgs/Layer 3.png'
import pasta from '../../assets/imgs/CategoriesImgs/Layer 4.png'
import dessert from '../../assets/imgs/CategoriesImgs/Layer 5.png'
import wok from '../../assets/imgs/CategoriesImgs/Layer 6.png'
import { IoIosArrowRoundBack } from 'react-icons/io'
import NavHeader from '../../Component/NavHeader'
import { useCategories } from '../Store'


export default function CategoryProduct() {
    const params = useParams();
    const navigate = useNavigate()
    const [check, setCheck] = useState(false)
    const [categoryInfo, setCategoryInfo] = useState({})

    const { data: categories, resetActiveId, active_cat_id } = useCategories()

    useEffect(() => {
        // if (params) {
        //     //لو لقيت ان المسار الحالي موجود في اي واحد من المسارات اللي فوق ساعتها خلينا جوا الصفحة لو لا يبقي هنطلع برة
        //     let obj = categories.find((el) => { return el.path == params.catName })
        //     if (obj) {
        //         setCheck(true)
        //     } else {
        //         navigate("/error")
        //     }
        // }
        // id واني بعتمد علي اسم المسار هخلي يعتمد علي  hard code هنا بقي علشان ميبقاش 
        let obj = categories.find((el, index) => { return el.documentId == active_cat_id })
        if (obj) {
            setCategoryInfo(obj)
            setCheck(true)
        } else {
            navigate("/error")
        }
        return () => {
            resetActiveId()
        }
    }, [])
    return (
        check &&
        <div>
            <NavHeader tabName={categoryInfo.name} />
            <h1>Product in Cat : {categoryInfo.name}</h1>
        </div>
    )
}
