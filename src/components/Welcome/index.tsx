import React, { forwardRef } from "react"
import { motion } from 'framer-motion'
import './Welcome.scss'
import { ReactComponent as LinkedinIcon } from '../../assets/svg/linkedin.svg'
import { ReactComponent as GithubIcon } from '../../assets/svg/github.svg'
import { ReactComponent as CodepenIcon } from '../../assets/svg/codepen.svg'
import useCurrentSection from "../../hooks/useCurrentSection"
import slugify from "slugify"

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

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ id }) => {
    const setSectionRef = useCurrentSection('Hello')
    const slugifiedId = slugify(id, { lower: true, replacement: '-' })


    return (
        <section id={slugifiedId} ref={setSectionRef} className="section welcome-section" >
            <div style={{ maxWidth: 1400, margin: 'auto' }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="welcome-text">
                    <motion.h2
                        className="greetings"
                        custom={1}
                        variants={variants}>
                        Hello!</motion.h2>
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
                </motion.div>
                <motion.p
                    initial="hidden"
                    animate="visible"
                    className="external-links">
                    <motion.a
                        custom={6}
                        variants={variants}
                        href="https://www.linkedin.com/in/anis-dimassi-0610a217b/"
                        aria-label="Linkedin profile link"
                        title="Linkedin profile link"
                        rel="noreferrer nofollow noopener"
                        target='_blank'>
                        <LinkedinIcon className="linkedin-icon" />
                    </motion.a>
                    <motion.a
                        custom={7} variants={variants}
                        href="https://github.com/Anissemm/"
                        aria-label="Github profile link"
                        title="Github profile link"
                        rel="noreferrer nofollow noopener"
                        target='_blank'>
                        <GithubIcon className="github-icon" />
                    </motion.a>
                    <motion.a
                        custom={7} variants={variants}
                        href="https://codepen.io/anissemd"
                        aria-label="Codepen profile link"
                        title="Codepen profile link"
                        rel="noreferrer nofollow noopener"
                        target='_blank'>
                        <CodepenIcon className="codepen-icon" />
                    </motion.a>
                </motion.p>
            </div>
        </section>
    )
}

export default WelcomeHeader