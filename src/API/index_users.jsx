import axios from "axios"

export const index_users = async (domain,phoneInput,passworInput) => {
    let final =[]
    let url = domain+'/api/pos-users'
    await axios.get(url,{
        params:{
            filters:{
                $and:[
                    {
                        user_phone:{
                            $eq:phoneInput.current.value
                        }
                    },
                    {
                        user_password:{
                            $eq:passworInput.current.value
                        }
                    }
                ]
            }
        }

    }).then((res) => {
        final = res.data.data
        console.log(res.data.data) 
    }).catch ((error)=>{
        console.error("Error in API call: ", error); 

    }) 
    return final
}