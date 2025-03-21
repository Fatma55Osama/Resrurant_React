import axios from "axios"

export const index_getInvoices = async (domain, date) => {
  let user_id = JSON.parse(sessionStorage.getItem('userInfo')).user_id
  let final = []
  let url = domain + '/api/invoice-bills'
  await axios.get(url, {
    params: {
      populate: "*",
      filters: {
        $and: [
          {
            invoice_date: {
              $eq: date
            }
          },
          {
            pos_user: {
              documentId: {
                $eq: user_id
              }
            }
          }
        ]

      }
    }
  }).then((res) => {
    final = res.data.data
  })
  return final;
}