import React from 'react'
import { stepsData } from '../assets/assets'
//installing "motion" pkg "npm install motion" it used for animation
import { motion } from "motion/react"
//import {motion} from "framer-motion"

const Steps = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-32 '
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}}//Ensures the animation only happens once, when it first enters the viewport.
    >
        <h1 className='text-3xl sm:text-4xl
        font-semibold mb-2'>How it works</h1>

        <p className='text-lg text-gray-600 mb-8'>Transfor words into stunning images</p>

        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item, index)=>(
                <div className='flex items-center p-5 px-8 bg-white/20 shadow-md cursor-pointer 
                hover:scale-[1.02] transition-all duration-300 rounded-lg'  
                key={index}>
                    <img width={40} src={item.icon} alt="" />
                    <div>
                        <h2 className='text-xl font-medium'>{item.title}</h2>
                        <p className='text-gray-500'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Steps