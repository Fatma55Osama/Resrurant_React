import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { IoMdClose } from 'react-icons/io'
import { useCategories, useSideCart } from '../../Pages/Store'
import { BiDollar } from 'react-icons/bi'
import Swal from 'sweetalert2'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { postNewInvoice } from '../../API/PostNewInvoice'
import axios from 'axios'
export default function CheckOut() {
    const { openCheckOut, closeCheckOut, closeCart, productInCart, resetCart } = useSideCart()
    const { domain } = useCategories()
    const [btnClass, setBtnClass] = useState('btn-primary')
    const [coustomeramount, setCoustomeramount] = useState(0) // input بيدخله في ال  user اللي ال 
    const [remain, setRemain] = useState(0) // الباقي
    const handelclose = (e) => {
        e.stopPropagation()
        closeCheckOut()
    }
    const getTotal = () => {
        return productInCart.reduce((acc, el) => acc + (el.qty * el.price), 0);
    }
    let total = getTotal()
    const handelChange = (e) => {
        let value = e.target.value
        setCoustomeramount(value);
        setRemain(+value - getTotal())
        if (value < getTotal()) {
            setBtnClass('bg-danger')
        } else {
            setBtnClass('btn-primary')
        }

    }
    const handelcomplet = () => {
        if (remain < 0 || coustomeramount == 0) {
            toast.error("Insufficient funds! Please add more money.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } else {
            Swal.fire({
                icon: "success",
                text: "Done Complete"
            })
            postNewInvoice(domain, total).then((res) => {
                let newinvice = res;
                let newInvoicedId = newinvice.documentId
                creatRecords(newInvoicedId)
                console.log("id invoices is" + newInvoicedId)

            })

        }

    }
    const creatRecords = (newInvoicedId) => {
        productInCart.forEach((el) => {
            let url = domain + '/api/invoices-details'
            let data = {
                product_qtr: el.qty,
                invoice_bill: {
                    connect: [newInvoicedId]
                },
                product: {
                    connect: [el.documentId]
                }
            }
            axios.post(url, { data: data }).then(() => {
                console.log('record saved to DB')
            })

        })
        closeCheckOut();
        resetCart();
        closeCart()
        toast.success("Invoice Sucssfully Saves!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        })

    }
    return (
        <div className={styles.overlay} onClick={handelclose}>

            <ToastContainer position="top-center" autoClose={3000} />
            <div className={styles.contentcheck + ' col-10 col-md-6 col-lg-4 p-3 bg-white rounded mt-5 shadow animate__animated animate__fadeInDown gap-3 '} onClick={(e => e.stopPropagation())}>
                <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='fw-bold'> CheckOut</h5>
                    <IoMdClose className='text-secondary' onClick={() => closeCheckOut()} />
                </div>
                <div className='border rounded col-12 d-flex flex-column justify-content-center align-items-center p-3'>
                    <h5>Total Amount</h5>
                    <h4 className='fw-bold text-primary'>${getTotal()}</h4>

                </div>
                <div className=' col-12 d-flex flex-column gap-3  mt-4'>
                    <span className='fw-bold'>Customer Payment</span>
                    <div className='border rounded col-12 d-flex '>
                        <button className='border p-2'><BiDollar /></button>
                        <input type='number' value={coustomeramount} placeholder='Enter amount ' className='p-2 form-control border-0 shadow-none' onChange={handelChange} />
                    </div>
                </div>
                <div className='d-flex justify-content-between mt-4'>
                    <span className='fw-bold'>Change Due :</span>
                    <h4 className='text-success'>${remain}</h4>
                </div>
                <button className={`btn ${btnClass} col-12`} onClick={handelcomplet}>Complete Payment</button>
            </div>
        </div>
    )
}
