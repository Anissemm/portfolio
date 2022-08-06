import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

interface HeadingProps {
    itemNumber: number 
}

const Heading: React.FC<PropsWithChildren<HeadingProps>> = ({ itemNumber, children }) => {
    return (
        <motion.h2
            className='section-heading'>
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0, }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5 }}
                className='numeration'>
                0{itemNumber} - </motion.div>
            <motion.div
                viewport={{ once: true, margin: '-20px' }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0, }}
                transition={{ duration: 0.5, delay: 0.5 }}> {children}</motion.div>
        </motion.h2>
    )
}

export default Heading