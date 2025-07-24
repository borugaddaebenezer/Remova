import { createContext } from "react";
import {useAuth} from '@clerk/clerk-react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useState, useEffect } from "react";


export const AppContext=createContext()


const AppContextProvider=(props) =>{

    const [credit, setCredit ] = useState(false)
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const {getToken}=useAuth()
    const loadCreditsData=async()=>{
        try{
            const token=await getToken()
            const {data}=await axios.get(backendurl+'/api/user/credits',{headers:{token}})
            if(data.success){
                setCredit(data.credits)
                console.log(data.credits)
            }
        } catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const value={
        credit,setCredit,loadCreditsData,backendurl
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider