import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import moment from 'moment'
import { useCategories, useInvoiceDetails } from '../Store'
import { index_getInvoices } from '../../API/index_getInvoices'
import InvoiceDetails from '../InvoiceDetails'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { Alert } from 'bootstrap'
export default function Invoice() {
    const [invoices, setInvoices] = useState([])
    const { domain } = useCategories()
    const [selectedDate,setSelectedDate] =useState(moment().format('YYYY-MM-DD'))
    const { index, openDetails, closeDetails, setActiveInvoiceId } = useInvoiceDetails()
    useEffect(() => {
        index_getInvoices(domain,selectedDate).then((res) => {
            setInvoices(res)
            console.log(res)
        })
    }, [])
    const handeleDateChange=(e)=>{
          let newDate =e.target.value
         setSelectedDate(newDate)
         index_getInvoices(domain, newDate).then((res) => {  // جلب الفواتير بناءً على التاريخ الجديد
            setInvoices(res)
        })
    }
    return (
        <div className={styles.InvoicePage + ' d-flex flex-column p-3 gap-3'}>


            {index && <InvoiceDetails />}
            <div className='d-flex justify-content-between '>
                <h3><FaFileInvoiceDollar /> Invoices</h3>
                <input type="date" defaultValue={moment().format().split('T')[0]} max={moment().format().split('T')[0]} onChange={handeleDateChange}/>
            </div>

            {invoices.length > 0 ? (invoices.map((el) => (
                <div key={el.documentId} onClick={() => { openDetails(), setActiveInvoiceId(el.documentId) }} className='col-12 col-md-6 col-lg-4 rounded border shadow p-3 bg-white d-flex align-items-center justify-content-between'>
                    <div className='d-flex flex-column'>
                        <h2>Order #{el.id}</h2>
                        <span>Done By {el.pos_user.user_name}</span>
                    </div>
                    <div className='d-flex flex-column'>
                        <h3>{el.invoice_total}$</h3>
                        <span>{el.createdAt.slice(11, 16)}</span>
                    </div>
                </div>
            ))
            ) : (
                <p>There are not Invoices</p>

            )

            }

        </div>
    )
}
//Moment js react  this is library date مكتبة بتجيبلي التاريخ علطول
// npm i moment --save