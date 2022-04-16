import { forwardRef } from "react"
import { motion } from 'framer-motion'
import './Welcome.scss'

interface WelcomeHeaderProps {
    id: string,
}

const variants = {
    hidden: {
        y: -100,
        opacity: 0,
    },
    visible: (i: number) => {
        const delay = i * 0.3 + 0.3

        return {
            y: 0,
            opacity: 1,
            transition: {
                delay,
                duration: 0.3
            }
        }
    }
}

const WelcomeHeader = forwardRef<HTMLDivElement, WelcomeHeaderProps>(({ id }, ref) => {
    return (
        <section id={id} ref={ref} className="section" >
            <h2 className="sr-only">Welcome</h2>
            <motion.p initial="hidden" animate="visible" className="welcome-text">
                <motion.div className="greetings" custom={1} variants={variants}>Hello!</motion.div>
                <motion.div custom={2} variants={variants}>My name is Anis Dimassi.</motion.div>
                <motion.div custom={3} variants={variants}>
                    I'm a Full-Stack Web Developer, bringing you extraordinary digital solutions. 
                </motion.div>
            </motion.p>
        </section>
    )
})

export default WelcomeHeader