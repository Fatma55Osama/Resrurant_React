import axios from "axios"

export const index_getDetailsInvoice = async (domain, activeInvoiceId) => {
    let final = {}
    let url = domain + `/api/invoice-bills/${activeInvoiceId}`
    console.log(url)
    await axios.get(url, {
        params: {
            populate: {
                invoices_details: {
                    populate: {
                        product: {
                            populate: "*"
                        }
                    }
                }

            }
        }
    }).then((res) => {
        final = res.data.data
        console.log(final)
    }).catch((err) => { console.log(err.response?.data || err.message) })
    return final;
}