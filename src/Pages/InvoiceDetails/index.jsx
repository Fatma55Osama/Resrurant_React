import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { IoMdClose } from 'react-icons/io'
import { useCategories, useInvoiceDetails } from '../Store'
import { index_getDetailsInvoice } from '../../API/index_getDetailsInvoice'
export default function InvoiceDetails() {
    const { closeDetails, activeInvoiceId } = useInvoiceDetails()
    const [invoiceDetails, setInvoiceDetails] = useState({})
    const { domain } = useCategories()
    useEffect(() => {
        if (activeInvoiceId) {
            index_getDetailsInvoice(domain, activeInvoiceId).then((res) => {
                console.log(res)
                setInvoiceDetails(res)
            })
        }
    }, [activeInvoiceId])
    return (
        <div className={styles.details + " animate__animated animate__fadeInRight"}>
            <div className={styles.contentdetails} onClick={e => e.stopPropagation()}>
                <div className='d-flex justify-content-between rounded  p-3 border-bottom'>
                    <h4>Invoice #{invoiceDetails.id}</h4>
                    <IoMdClose className={'text-secondary fs-3'} onClick={closeDetails} />
                </div>
                <div className='text-secondary d-flex justify-content-between  p-3'>
                    <div className='text-secondary d-flex flex-column'>
                        <span>Date:</span>
                        <span>{invoiceDetails.invoice_date} ,10:54:51 PM</span>
                    </div>
                    <div className='d-flex flex-column'>
                        <span className='text-secondary'>Cashier:</span>
                        <span className='text-black'>Ahmed</span>
                    </div>
                </div>
                <div className='bg-white shadow p-3 '>
                    <table className='col-9 '>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                invoiceDetails.invoices_details && invoiceDetails.invoices_details.map((el, index) => (
                                    <tr key={el.documentId}>
                                        <td>{index+1}</td>
                                        <td className='d-flex align-items-center'><img src={domain+el.product.imges.url} alt="" />{el.product.name}</td>
                                        <td>{el.product.price}$</td>
                                        <td>{el.product_qtr}</td>
                                        <td>{el.product.price * el.product_qtr }$</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                        <tfoot>
                            <tr >
                                <th>Total: <span className='text-success'>{invoiceDetails.invoice_total}$</span></th>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>

        </div>
    )
}
