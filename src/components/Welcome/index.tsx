import { forwardRef } from "react"
import { motion } from 'framer-motion'
import './Welcome.scss'
import { ReactComponent as LinkedinIcon } from '../../assets/svg/linkedin.svg'
import { ReactComponent as GithubIcon } from '../../assets/svg/github.svg'

interface WelcomeHeaderProps {
    id: string,
}

const variants = {
    hidden: {
        y: -100,
        opacity: 0,
    },
    visible: (i: number) => {
        const delay = i * 0.2 + 0.2

        return {
            y: 0,
            opacity: 1,
            transition: {
                y: {
                    delay,
                    duration: 0.3
                },
                opacity: {
                    delay,
                    duration: 0.4
                }
            }
        }
    }
}

const WelcomeHeader = forwardRef<HTMLDivElement, WelcomeHeaderProps>(({ id }, ref) => {
    return (
        <section id={id} ref={ref} className="section welcome-section" >
            <h2 className="sr-only">Welcome</h2>
            <motion.p
                initial="hidden"
                animate="visible"
                className="welcome-text">
                <motion.div
                    className="greetings"
                    custom={1}
                    variants={variants}>
                    Hello!</motion.div>
                <motion.div
                    custom={2}
                    variants={variants}>
                    My name is Anis Dimassi.</motion.div>
                <motion.div
                    custom={3}
                    variants={variants}>
                    I'm a Full-Stack Web Developer, bringing you extraordinary digital solutions.
                </motion.div>
                <motion.a
                    className="resume-link"
                    initial={{ background: 'rgb(4, 102, 200, 0.1)', scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ background: 'rgb(4, 102, 200, 0.4)' }}
                    transition={{
                        delay: 1,
                        transition: 1,
                        background: {
                            transition: 0.5,
                            delay: 0
                        }
                    }}
                >
                    My Resume
                </motion.a>
            </motion.p>
            <motion.p
                initial="hidden"
                animate="visible"
                className="external-links">
                <motion.a
                    custom={6}
                    variants={variants}
                    href="https://www.linkedin.com/in/anis-dimassi-0610a217b/"
                    aria-label="Linkedin profile link"
                    target='_blank'>
                    <LinkedinIcon className="linkedin-icon" />
                </motion.a>
                <motion.a
                    custom={7} variants={variants}
                    href="https://www.linkedin.com/in/anis-dimassi-0610a217b/"
                    aria-label="Linkedin profile link"
                    target='_blank'>
                    <GithubIcon className="github-icon" />
                </motion.a>
            </motion.p>
        </section>
    )
})

export default WelcomeHeader