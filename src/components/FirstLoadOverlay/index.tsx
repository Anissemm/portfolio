import React from 'react'
import { motion, Variants } from 'framer-motion'
import Logo from '../../assets/svg/logo'
import './FirstLoadOverlay.scss'

const variants: Variants = {
    hidden: (i: any) => ({
        opacity: 0,
        transtion: {
            delay: i * 0.3
        }
    }),
    visible: (i: any) => ({
        opacity: 1,
        transtion: {
            delay: i * 0.3
        }
    }),
}

const FirstLoadOverlay = () => {
    return (
        <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className='background'>
            <Logo
                layoutId='logo'
                style={{ width: 150 }}
                custom={1}
                initial='hidden'
                animate='visible'
                exit='hidden'
            ></Logo>
        </motion.div>
    )
}

export default FirstLoadOverlay