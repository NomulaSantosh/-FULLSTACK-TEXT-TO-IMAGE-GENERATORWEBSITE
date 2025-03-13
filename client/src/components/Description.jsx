import React from 'react'
import { assets } from '../assets/assets'
//installing "motion" pkg "npm install motion" it used for animation
import { motion } from "motion/react"
//import {motion} from "framer-motion"

const Description = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    initial={{opacity: 0.2, y: 100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once:true}}
    >
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
        <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            {/*flex-col (Column Layout on Small Screens)
            This sets the default direction of flex children to vertical (column).On small screens, elements inside this <div> will be stacked vertically.
            md:flex-row (Row Layout on Medium+ Screens): On medium screens (md ≥ 768px), the layout switches from flex-col to flex-row.
            This means the image and text will be side by side instead of stacked.*/}
            <img src={assets.sample_img_1} alt="" className='w-60 xl:w-70 rounded-lg'/>
            <div>
                <h2 className='text-3xl max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
                <p className='text-gray-600 mb-10'>
                Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
                </p>
                <p className='text-gray-600'>
                Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
                </p>
            </div>
        </div>
    </motion.div>
  )
}

export default Description