import axios from "axios"
import moment from "moment"

export const postNewInvoice = async (domain,total) => {
    let user_id = JSON.parse(sessionStorage.getItem('userInfo')).user_id
    let invoices=[]
    let endpoint = "/api/invoice-bills"
    let url = domain + endpoint
    let data = {
        invoice_total: total,
        invoice_date: moment().format('YYYY-MM-DD'),
        pos_user: {
            connect:[user_id] //user_id 
        }
    }
    await axios.post(url,
         {data:  data }
    ).then((res) => {
        invoices = res.data.data || []
    }).catch((err)=>{console.log(err.response?.data || err.message)})
     return  invoices 
}