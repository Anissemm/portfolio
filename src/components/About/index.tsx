import React, { forwardRef, MutableRefObject, useEffect, useRef } from 'react'
import ProfilePicture from '../../assets/profil.png'
import { motion } from 'framer-motion'
import './About.scss'
import { useInView } from 'react-intersection-observer'
import { useAppDispatch } from '../../store'
import { setCurrentSection } from '../../store/reducers/navigationSlice'
import slugify from 'slugify'
import useCurrentSection from '../../hooks/useCurrentSection'

interface AboutProps {
    id: string
}

const headerVariants = {
    hiddden: {
        opacity: 0,
        x: 100,
    },
    visible: (i: number = 1) => {
        const delay = i * 0.4 + 1

        return {
            opacity: 1,
            x: 0,
        }
    }

}

const About: React.FC<AboutProps> = ({ id }) => {
    const setSectionRef = useCurrentSection('About')
    const slugifiedId = slugify(id, {lower: true, replacement: '-'})
    
    return (
        <section id={slugifiedId} ref={setSectionRef} className="section about-section">
            <h2
                className='section-heading'>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0, }}
                    viewport={{ margin: '-20px' }}
                    transition={{ duration: 0.5 }}
                    className='numeration'>
                    01 - </motion.div>
                <motion.div
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0, }}
                    transition={{ duration: 0.5, delay: 0.5 }}> About Me</motion.div>
            </h2>

            <div className='about-body'>
                <motion.p
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML &amp; CSS!
                </motion.p>

                <motion.p
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    Fast-forward to today, and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.
                </motion.p>

                <motion.p
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node &amp; React.
                </motion.p>
                <motion.ul
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className='tech-stack'>
                    Here are a few technologies I’ve been working with recently:
                    <motion.li>JavaScript (ES6+)</motion.li>
                    <motion.li>TypeScript</motion.li>
                    <motion.li>React</motion.li>
                    <motion.li>Node.js</motion.li>
                    <motion.li>Wordpress</motion.li>
                </motion.ul>
                <div className='picture'>
                    <div className='picture-wrapper'>
                        <picture>
                            {/* <img src={ProfilePicture} /> */}
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About