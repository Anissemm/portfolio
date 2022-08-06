import React, { forwardRef, MutableRefObject, useEffect, useRef } from 'react'
import ProfilePicture from '../../assets/profil.png'
import { motion } from 'framer-motion'
import './About.scss'
import { useInView } from 'react-intersection-observer'
import { useAppDispatch, useAppSelector } from '../../store'
import { setCurrentSection } from '../../store/reducers/navigationSlice'
import slugify from 'slugify'
import useCurrentSection from '../../hooks/useCurrentSection'
import { getCurrentBreakpoint } from '../../store/reducers/uiSlice'
import Heading from '../Heading'

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
    const slugifiedId = slugify(id, { lower: true, replacement: '-' })
    const screenBreakpoint = useAppSelector(getCurrentBreakpoint)
    const smallBreakpoints = [null, 'sxs', 'xs', 'sm']

    return (
        <section id={slugifiedId} ref={setSectionRef} className="section about-section">
            <Heading itemNumber={1}>About me</Heading> 
            <div className='about-body'>
                <div className='first-paragraph'>
                    {!smallBreakpoints.includes(screenBreakpoint) && <Picture src={ProfilePicture} />}
                    <motion.p
                        viewport={{ once: true, margin: '-20px' }}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0, }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Hello! My name is Anis I am a full-stack web developer currently in search of opportunities that contribute to realizing my skills and capabilities in creating digital experiences.
                    </motion.p>
                </div>
                <motion.p
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    My interest in Web development started in 2020 when I decided to create a custom blog website from scratch using WordPress. That was an almost impossible challenge to overcome with no programming knowledge during that period, but it helped me acquire considerable skills in a tiny amount of time.
                </motion.p>

                <motion.p
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Since I got a degree in filmmaking, I worked as a freelancer in editing and designing sound and video, parallelly learning programming and computer science until acquiring, in my opinion, the minimum required basic knowledge to postulate for a job as a developer.
                </motion.p>

                <motion.p
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    I have faith that my experience in the multimedia industry enhanced my skills to innovate and think outside the box, i.e., will be helpful in software design and development.
                </motion.p>
                <motion.ul
                    viewport={{ once: true, margin: '-10px' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='tech-stack'>
                    <div className='tech-stack-description'>
                        Here are a few technologies I’ve been working with recently:
                    </div>
                    <motion.li>JavaScript (ES6+)</motion.li>
                    <motion.li>TypeScript</motion.li>
                    <motion.li>React</motion.li>
                    <motion.li>Node.js</motion.li>
                    <motion.li>NextJS</motion.li>
                </motion.ul>
                {smallBreakpoints.includes(screenBreakpoint) && <Picture src={ProfilePicture} />}
            </div>
        </section>
    )
}

const Picture: React.FC<{ src: string }> = ({ src }) => {
    return (
        <motion.div
            viewport={{ once: true, margin: '-20px' }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0, }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='picture'>
            <div className='picture-wrapper'>
                <motion.div
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className='blend' />
                <img src={src} alt='My Profile Picture' />
            </div>
        </motion.div>
    )
}

export default About