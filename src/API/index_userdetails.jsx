import axios from "axios"

export const index_userdetails = async (domain,user_id) => {
    let final ={}
    let url = domain+`/api/pos-users/${user_id}`
    await axios.get(url).then((res) => {
        final = res.data.data
    }).catch ((error)=>{
        console.error("Error in API call: ", error); 
        sessionStorage.clear()
        navgaite('/login')
    }) 
    return final
}