import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useSideCart } from '../../Pages/Store'
import { FaCreditCard, FaShoppingCart } from 'react-icons/fa'
import { FaBagShopping } from 'react-icons/fa6'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ImBin2 } from 'react-icons/im'
import Swal from 'sweetalert2'
import CheckOut from '../CheckOut'
export default function SideCart() {
    const { closeCart, productInCart, resetCart, checkOutIndex, openCheckOut } = useSideCart()
    const [total, setTotal] = useState(0)
    const { decrementqty, incrementqty } = useSideCart()
    const handelreset = () => {
        Swal.fire({
            icon: "question",
            title: "Are you sure?",
            text: "You are going to delete all products in cart",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonText: "Yes Reset"
        }).then((res) => {
            if (res.isConfirmed) {
                resetCart();
            }
        })
    }
    useEffect(() => {
        let newtotal = productInCart.reduce((acc, el) => acc + (+el.qty * +el.price), 0)
        setTotal(newtotal)
    }, [productInCart])
    return (
        <div className={styles.overlay} onClick={closeCart}>
            <div className={styles.contant + " animate__animated animate__fadeInRight p-3 d-flex flex-column gap-3  "} onClick={(e) => e.stopPropagation()}>
                    <h3 className='fw-bold col-12 d-flex align-items-center gap-2'> <FaBagShopping />Your Cart </h3>
                <div className='d-flex flex-column'>
                    {
                        productInCart.length > 0 ? (
                            <>
                                <table className='table '>
                                    <thead className='table-dark'>
                                        <tr>
                                            <th>-</th>
                                            <th>Items</th>
                                            <th>price</th>
                                            <th>Qty</th>
                                            <th>Total</th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            productInCart.map((el, index) => (
                                                <tr key={el.documentId}>
                                                    <td className='fw-bold'>{index + 1}</td>
                                                    <td><div className='d-flex justify-content-center align-items-center'>{el.name} <img src={el.imgUrl} alt="" /></div></td>
                                                    <td>{el.price}$</td>
                                                    <td><div className='d-flex justify-content-center gap-2 align-items-center'><button onClick={() => decrementqty(el.documentId)} className='btn btn-danger'>-</button>{el.qty} <button onClick={() => incrementqty(el.documentId)} className='btn btn-success'>+</button></div> </td>
                                                    <td> {el.price * el.qty}$</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                    <tfoot>
                                        <tr className='fw-bold'>
                                            <td colSpan={4}>Total</td>
                                            <td>{total}$</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className='d-flex flex-row justify-content-between'>
                                    <button className='border-danger text-danger bg-white rounded-3 py-2 px-2' onClick={handelreset}><ImBin2 /> Clear Cart</button>
                                    <button className=' btn btn-primary text-white rounded-3 py-2 px-2' onClick={openCheckOut} ><FaCreditCard /> Checkout</button>
                                </div> </>) : <div className='d-flex justify-content-center align-items-center mt-5 flex-grow-1 py-5'><h5 className='fw-bold text-danger  '>There are No Products In Csrt</h5></div> 
                    }
                </div>

            </div>
            {checkOutIndex && <CheckOut />}
        </div>
    )
}
