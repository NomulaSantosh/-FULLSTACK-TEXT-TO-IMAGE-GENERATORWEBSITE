import React, {useContext, useState, useEffect} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
//installing "motion" pkg "npm install motion" it used for animation
import { motion } from "motion/react"
//import {motion} from "framer-motion"
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Login')
  const {setShowLogin, backendUrl, setToken, setUser} = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //we will create a func that will either create the account or it will login
  // to the existing account

  const onSubmitHandler = async(e) =>{
    // It will prevent the web page from reloading whenever we submit the form
    e.preventDefault();

    try {
      if(state === 'Login'){
        // we will call the login api
        const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})

        //if data is successfully true it will login
        if(data.success){
          //we will get the token from the response and we will set the token available
          // in the AppContext
          setToken(data.token())// we're getting token in the response after login 
          setUser(data.user) // we'll get the user from the AppContext
          //now we have to store the token in the browser's local storage and provide our token
          //that we're getting from the response " data.token"
          localStorage.setItem('token', data.token)
          // now hide the login form
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      } else {
        // we will call the register api
        const {data} = await axios.post(backendUrl + '/ap/user/register', {name, email, password})

        if(data.success){
          setToken(data.token())
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(data.message)
    }
  }

  useEffect(()=>{
    //it will disable the scrolling when the login page shows up
    document.body.style.overflow = 'hidden';

    // This restores normal scrolling when the login component is removed.
    // The return function is called when the component unmounts.
    return ()=>{
      document.body.style.overflow = 'unset';
    }

  }, [])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 
    backdrop-blur-sm bg-black/30 flex justify-center items-center'>

        <motion.form onSubmit={onSubmitHandler}
        className='relative bg-white p-10 rounded-xl text-slate-500'
        initial={{opacity:0.2, y:50}}
        transition={{duration:0.3}}
        whileInView={{ opacity: 1, y: 0}}
        viewport={{ once: true}}
        >
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please Sign in to Continue</p>

            {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2
            rounded-full mt-5'>
            <img width={30} src={assets.profile_icon} alt="" />
            <input onChange={e => setName(e.target.value)} value={name}
             type="text" className='outline-none text-sm' placeholder='Full Name' required />
            </div>}

            <div className='border px-6 py-2 flex items-center gap-2
            rounded-full mt-4'>
            <img width={40} src={assets.email_icon} alt="" />
            <input  onChange={e => setEmail(e.target.value)} value={email}
            type="email" className='outline-none text-sm' placeholder='Email id' required />
            </div>

            <div className='border px-6 py-2 flex items-center gap-2
            rounded-full mt-4'>
            <img width={25} src={assets.lock_icon} alt="" />
            <input  onChange={e => setPassword(e.target.value)} value={password}
            type="password" className='outline-none text-sm' placeholder='Password' required />
            </div>

            <p className='text-sm text-blue-600 my-4
            cursor-pointer'>Forgot Password?</p>

            <button className='bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer'>
              {state === 'Login' ? 'login' : 'create account' }</button>

            {state === 'Login' ? <p className='mt-5 text-center'>Don't have an account? 
              <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}> Sign Up</span></p> :

            <p className='mt-5 text-center'>Already have an account? 
            <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}> Login</span></p>}

            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
        </motion.form>
    </div>
  )
}

export default Login