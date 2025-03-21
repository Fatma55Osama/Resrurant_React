import axios from "axios"
import { Await } from "react-router-dom"
import { useCategories } from "../Pages/Store"

export const getData =async(domain)=>{
  
  let cat =[]
  let endpoint ="/api/categories"
  let url = domain + endpoint
  await axios(url,{
    params:{
        populate:"*"
    }
  }).then((res)=>{
    cat =res.data.data || []
  }).catch((err)=>{console.log(err)})
  return cat
}