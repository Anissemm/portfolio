import { forwardRef, MouseEvent, PointerEvent, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import KsorstnImg from '../../assets/ksorstn-sm.jpg'
import GoogleDocClone from '../../assets/inifinityEditor-sm.png'
import './Work.scss'
import useCurrentSection from "../../hooks/useCurrentSection"
import slugify from "slugify"
import { useResizeObserver } from "../../hooks/useResizeObserver"
import { eventFrom } from "event-from"

interface WorkProps {
    id: string
}

const WorkSection: React.FC<WorkProps> = ({ id }) => {
    const setSectionRef = useCurrentSection('Work')
    const slugifiedId = slugify(id, { lower: true, replacement: '-' })

    return (
        <section id={slugifiedId} ref={setSectionRef} className="section work-section" >
            <motion.h2
                className='section-heading'>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0, }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.5 }}
                    className='numeration'>
                    02 - </motion.div>
                <motion.div
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0, }}
                    transition={{ duration: 0.5, delay: 0.5 }}> Some things I did</motion.div>
            </motion.h2>
            <div className="projects">
                <Project 
                    title='Blog website - Ksorstn.org'
                    techStack={['HTML', 'CSS', 'Javascript', 'PHP', 'Wordpress']}
                    image={KsorstnImg}
                    content='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia dolorum alias magni blanditiis mollitia quidem doloremque soluta, numquam laboriosam ratione, iure sunt quibusdam debitis ea, asperiores assumenda esse adipisci illo?' />
                <Project 
                    title='Google Doc Clone'
                    image={GoogleDocClone}
                    techStack={['NextJS', 'Firestore', 'QuillJs', 'TailwindCss']}
                    content='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia dolorum alias magni blanditiis mollitia quidem doloremque soluta, numquam laboriosam ratione, iure sunt quibusdam debitis ea, asperiores assumenda esse adipisci illo?' />
            </div>
        </section>
    )
}

interface ProjectCardProps {
    title: string
    content: string
    techStack: string[]
    image: string
}

const Project: React.FC<ProjectCardProps> = ({ title = '', content = '', techStack, image = '' }) => {
    const [descriptionHeight, setDescriptionHeight] = useState<undefined | number | null>()
    const [showDescription, setShowDescription] = useState(false)
    const [firstClick, setFirstClick] = useState(true)
    const [setDescriptionRef, descriptionEntry] = useResizeObserver()


    useEffect(() => {
        setDescriptionHeight(descriptionEntry?.target.scrollHeight)
    }, [descriptionEntry])

    return (
        <article
            className="project">
            <a
                // onPointerEnter={(e: PointerEvent<HTMLAnchorElement>) => {
                //     if (e.pointerType === 'touch') {
                //         e.preventDefault()
                //     } else {
                //         setShowDescription(true)
                //     }
                // }}
                // onPointerLeave={(e: any) => {
                //     if (e.pointerType === 'touch') {
                //         e.preventDefault()
                //     } else {
                //         setShowDescription(false)
                //     }
                // }}
                // onClick={(e: MouseEvent) => {
                //     if (eventFrom(e) === 'touch') {
                //         if (firstClick && !showDescription) {
                //             e.preventDefault()
                //             setFirstClick(false)
                //             setShowDescription(true)
                //         } else {
                //             setFirstClick(true)
                //             setShowDescription(false)
                //         }
                //     }
                // }}
                href='https://ksorstn.org' target='_blank' rel='noreferrer nofollow noopener'>
                <div>
                    <div className='project-background' />
                    <div className="project-wrapper">
                        <div className="project-thumbnail">
                            <div className='thumbnail-blend' />
                            <img src={image} alt='Ksorstn.org Wordpress Blog image' />
                        </div>
                        <div className='project-text'>
                            <h3 className='project-title'>{title}</h3>
                            <p
                                // ref={setDescriptionRef}
                                // data-height={descriptionHeight ? `${descriptionHeight}px` : 'auto'}
                                // style={{
                                //     height: showDescription && descriptionHeight ? descriptionHeight : undefined,
                                //     transition: showDescription ? 'all 60ms ease-in' : 'all 300ms ease-out'
                                // }}
                                className='project-description'>
                            {content}
                            </p>
                            <ul className='project-tech-stack'>
                                {techStack.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    )
}

export default WorkSection