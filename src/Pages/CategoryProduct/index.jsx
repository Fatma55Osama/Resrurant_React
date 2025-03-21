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
import ProductCard from '../../Component/ProductCard'
import { getdetailsdata } from '../../API/GetDetailsData'


export default function CategoryProduct() {
    const params = useParams();
    const navigate = useNavigate()
    const [check, setCheck] = useState(true)
    const [categoryInfo, setCategoryInfo] = useState({})

    const { data: categories, resetActiveId, active_cat_id, domain } = useCategories()

    let id = params.id
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
        getdetailsdata(domain, id).then((res) => {
            setCategoryInfo(res)
        }).catch((err) => { navigate("/error") })
        // let obj = categories.find((el, index) => { return el.documentId == active_cat_id })
        // if (obj) {
        //     setCategoryInfo(obj)
        //     setCheck(true)
        // } else {
        //     navigate("/error")
        // }
        return () => {
            resetActiveId()
        }

    }, [])
    return (
        check &&
        <div className={styles.allcatproduct + ' flex-grow-1'}>
            <div className={ styles.catover + "   d-flex flex-column" }>
                <NavHeader tabName={categoryInfo.Category_name} />
                <h1 className='m-0 p-0 ms-4'>Product in Cat : {categoryInfo.Category_name}</h1>
                <div className='col-12 gap-4 container d-flex flex-wrap justify-content-center align-items-center p-3'>
                    {
                        categoryInfo.products
                        && categoryInfo.products
                            .map((el) => (

                                <ProductCard key={el.documentId} name={el.name} price={el.price} img={domain + el.imges.url} product={el} />
                            ))
                    }
                </div>
            </div>

        </div>
    )
}
