import axios from "axios"

export const getdetailsdata =async(domain,id)=>{
    let siglecat={}
    let endPoint =`/api/categories/${id}`
    let url = domain + endPoint
    await axios.get(url,{
        params:{
            populate:{
                products:{
                    populate:"*"
                }
            }
        }
    }).then((res)=>{
        siglecat =res.data.data || []
    }).catch((err)=>{console.log(err) ,navigate("/error")})
    return siglecat
}