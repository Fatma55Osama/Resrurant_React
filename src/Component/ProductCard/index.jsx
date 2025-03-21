import React from 'react'
import styles from './index.module.css'
import { useCategories, useSideCart } from '../../Pages/Store'
export default function ProductCard({ name, price, img, product }) {
  const { domain } = useCategories()
  const { addToCart } = useSideCart()
  const handelAdd = (() => {
    let obj = { documentId: product.documentId, name: product.name, imgUrl:domain+ product.imges.url, price: product.price, qty: 1 }
    addToCart(obj)
  })
  return (
    <div className='col-12 col-md-6 col-lg-3 p-3 '>
      <div className={styles.card + ' rounded-5  shadow border p-3 col-12 d-flex flex-column'}>
        <img src={img} alt="" />
        <span>{name}</span>
        <p>{price} $</p>
        <button className='btn btn-primary' onClick={handelAdd}>Add To Card</button>
      </div>
    </div>
  )
}
