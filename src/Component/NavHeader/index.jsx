import React from 'react'
import styles from './index.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { FaAngleRight, FaShoppingCart } from 'react-icons/fa'
import { useCategories, useSideCart } from '../../Pages/Store'
export default function NavHeader({ tabName }) { // هنا بقي هقوله انت تسيبك من حته تاب نام لي علشان معتمدة علي الاسم والاسم ممكن يتغير انت تروح تشوف لو لقيت ان الاكتف كاتيجوري مش بصفر يبقي هو فاتح واحده منهم
    const { active_cat_id } = useCategories()
    const { openCart, productInCart } = useSideCart()
    return (
        <div className='d-flex  p-3 align-items-center justify-content-between'>
            <div className='d-flex gap-4 p-3 align-items-center'>


                { // هنا بقي هعتمد علي 
                    // active_cat
                    //  اللي هو مكانه
                    //tabName مش 
                    active_cat_id !== 0 && (<header className=' d-flex'>
                        <Link to={"/order"} className=' nav-link' ><IoIosArrowRoundBack id={styles.backbtn} /></Link>
                    </header>)
                }

                <div className=' col-12 d-flex align-items-center gap-2'>
                    <p className='m-0'>Food & Drinks </p>
                    <FaAngleRight />
                    <p className='m-0'>{tabName}</p>
                </div>
            </div>
            <div className='d-flex '>
                <FaShoppingCart onClick={openCart} className={styles.cart + " me-5"} />
                <span className={styles.count + " d-flex justify-content-center align-items-center"}>{productInCart.reduce((acc, el) =>  acc + el.qty , 0)}</span>
            </div>
        </div>)
}
