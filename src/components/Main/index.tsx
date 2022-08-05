import React, { forwardRef, MutableRefObject, RefAttributes } from "react"
import WelcomeHeader from '../Welcome'
import { motion } from 'framer-motion'
import About from '../About'
import Work from '../Work'
import ContactMe from "../ContactMe"

interface MainProps {
    menuItems: string[]
}

const Main = forwardRef<HTMLDivElement, MainProps>(({ menuItems }, ref) => {
    return (
        <motion.div ref={ref}>
            <WelcomeHeader id={menuItems[0]} />
            <About id={menuItems[1]} />
            <Work id={menuItems[2]} />
            <ContactMe id={menuItems[3]} />
        </motion.div>
    )
})

export default Main