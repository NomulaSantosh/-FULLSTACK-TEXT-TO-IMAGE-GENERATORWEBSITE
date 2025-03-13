import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext() //create the context

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    //we're adding the token state variable so that we can store the token 
    // in the localStorage and we can also get the token from the local storage
    // and in the token variable we will store the token generated from the api
    // so that we can enable the login and registration featured on this application
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    //after logging in we need username and credits from the api and we will display 
    // it in the navigation bar 
    const loadCreditsData = async ()=>{
        try {
            // we will call the credits api and we will store the data in this data variable
            const {data} = await axios.get(backendUrl + '/api/user/credits', {headers: {token}})

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // we're adding the functionality to generate the images using prompt for
    // that we have to create a function that will call the image generate api
    const generateImage = async (prompt)=>{
        try {
            //we will call the image generate api that we have created in the backend
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {header: {token}})
            
            if(data.success){
                loadCreditsData()
                // here we're returning resultImage from imageController.js api
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    // user can logout  
    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    //to execute the func loadCreditsData we will use useEffect
    useEffect(()=>{
        // if token is true
        if(token){
            loadCreditsData()
        }
    },[token])//whenever new token is there useEffect is executed

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage 
    };

    return (
        <AppContext.Provider value={value}>
            {props.children} {/* This allows nested components to access context */}
        </AppContext.Provider>
    )
}
export default AppContextProvider