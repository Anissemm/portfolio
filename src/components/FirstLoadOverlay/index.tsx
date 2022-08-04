import React, { PropsWithChildren } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Logo from '../../assets/svg/logo'
import './FirstLoadOverlay.scss'

const variants: Variants = {
    hidden: (i: any) => ({
        opacity: 0,
        transtion: {
            delay: i * 0.3,
            duration: 0.5
        }
    }),
    visible: (i: any) => ({
        opacity: 1,
        transtion: {
            delay: i * 0.3,
            duration: 0.5
        }
    }),
}

const FirstLoadOverlay: React.FC<PropsWithChildren<{ show: boolean }>> = ({ show = false, children }) => {
    return (
        <AnimatePresence>
            {show ? <motion.div
                variants={variants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className='background'>
                <div className='logo-circle'>
                    <Logo
                        style={{ width: 150 }}
                        custom={1}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                    />
                </div>
            </motion.div> :
                children
            }
        </AnimatePresence >
    )
}

export default FirstLoadOverlay