import { forwardRef, MouseEvent, PointerEvent, useEffect, useRef, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import KsorstnImgSm from '../../assets/ksorstn-sm.jpg'
import KsorstnImgLg from '../../assets/ksorstn-lg.jpg'
import GoogleDocCloneSm from '../../assets/inifinityEditor-sm.png'
import GoogleDocCloneLg from '../../assets/inifinityEditor-lg.png'
import './Work.scss'
import useCurrentSection from "../../hooks/useCurrentSection"
import slugify from "slugify"
import { useResizeObserver } from "../../hooks/useResizeObserver"
import { eventFrom } from "event-from"
import { useAppSelector } from "../../store"
import { getCurrentBreakpoint } from "../../store/reducers/uiSlice"
import { ReactComponent as ExternalLinkIcon } from '../../assets/svg/external-link-icon.svg'

interface WorkProps {
    id: string
}

const WorkSection: React.FC<WorkProps> = ({ id }) => {
    const setSectionRef = useCurrentSection('Work')
    const slugifiedId = slugify(id, { lower: true, replacement: '-' })
    const screenBreakpoint = useAppSelector(getCurrentBreakpoint)
    const largeBreakpoints = ['lg', 'xl', '2xl']
    const largeScreen = largeBreakpoints.includes(screenBreakpoint === null ? '' : screenBreakpoint)

    useEffect(() => {
        const handleClick = (e: any) => {
            console.log(e?.target?.closest('[data-hovering-side]'))
        }
        if (largeScreen) {
            document.addEventListener('click', handleClick)
        }

        return document.removeEventListener('click', handleClick)
    }, [largeScreen])

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
                    layoutId="ksorst"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-20px' }}
                    title='Blog website - Ksorstn.org'
                    link='https://ksorstn.org'
                    techStack={['HTML', 'CSS', 'Javascript', 'PHP', 'Wordpress']}
                    largeScreen={largeScreen}
                    image={largeScreen ? KsorstnImgLg : KsorstnImgSm}
                    content='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia dolorum alias magni blanditiis mollitia quidem doloremque soluta, numquam laboriosam ratione, iure sunt quibusdam debitis ea, asperiores assumenda esse adipisci illo?' />
                <Project
                    layoutId="googe-doc-1"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-20px' }}
                    title='Google Doc Clone'
                    largeScreen={largeScreen}
                    image={largeScreen ? GoogleDocCloneLg : GoogleDocCloneSm}
                    link='https://doc-editor-tau.vercel.app'
                    techStack={['NextJS', 'Firestore', 'QuillJs', 'TailwindCss']}
                    content='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia dolorum alias magni blanditiis mollitia quidem doloremque soluta, numquam laboriosam ratione, iure sunt quibusdam debitis ea, asperiores assumenda esse adipisci illo?' />
                <Project
                    layoutId="googe-doc-2"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-20px' }}
                    title='Google Doc Clone'
                    largeScreen={largeScreen}
                    image={largeScreen ? GoogleDocCloneLg : GoogleDocCloneSm}
                    link='https://doc-editor-tau.vercel.app'
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
    link: string
    largeScreen?: boolean
    layoutId: string
}

const Project = motion(forwardRef<HTMLDivElement, ProjectCardProps>(({ title = '', content = '', techStack, image = '', layoutId = '', link = '#', largeScreen = false }, ref) => {
    const [imageHeight, setImageHeight] = useState<undefined | number | null>()
    const [setImageRef, imageEntry] = useResizeObserver()
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        setImageHeight(imageEntry?.borderBoxSize[0].blockSize)
    }, [imageEntry])

    return (
        <motion.article
            ref={ref}
            className="project">
            {largeScreen ?
                <div>
                    <div className="project-wrapper">
                        <div
                            onPointerEnter={(e: any) => {
                                setHovered(true)
                            }}
                            onPointerLeave={(e: any) => {
                                setHovered(false)
                            }}
                            className={`left-side ${hovered ? 'hovered' : ''}`}>
                            <AnimatePresence initial exitBeforeEnter>
                                <LayoutGroup id={layoutId}>
                                    <div className='project-background' />
                                    {!hovered && <motion.div key='normal' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layoutId={layoutId} className="project-thumbnail" ref={setImageRef}>
                                        <div className='thumbnail-blend' />
                                        <ExternalLinkIcon className="external-link-icon" />
                                        <img src={image} alt='Ksorstn.org Wordpress Blog image' />
                                    </motion.div>}
                                    <header className='project-heading'>
                                        <h3>{title}</h3>
                                        <div className='tech-stack-wrapper'>
                                            <ul className='project-tech-stack'>
                                                {techStack.map((item: any) => <li key={item}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </header>
                                    {hovered && <motion.div key='hovered' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layoutId={layoutId} className="project-thumbnail" ref={setImageRef}>
                                        <img src={image} alt='Ksorstn.org Wordpress Blog image' />
                                        <span className="link-text">
                                            <a href={link} target='_blank' rel='noreferrer nofollow noopener'>
                                                <span>
                                                    Visit
                                                </span>
                                            </a>
                                        </span>
                                    </motion.div>}
                                </LayoutGroup>
                            </AnimatePresence> 
                        </div>
                        <div className='right-side'>
                            <p className='project-description'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptates pariatur, distinctio eum labore corporis vero atque earum accusantium tempore ratione? Atque explicabo repellat error unde, minima corporis quas est.
                            </p>
                        </div>
                    </div>
                </div> :
                <a href={link} target='_blank' rel='noreferrer nofollow noopener'>
                    <div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5, transition: 0.5 }}
                            viewport={{ once: true, margin: '-20px' }}
                            style={{ height: imageHeight ? imageHeight : undefined }}
                            className='project-background'
                        />
                        <div className="project-wrapper">
                            <div className="project-thumbnail" ref={setImageRef}>
                                <div className='thumbnail-blend' />
                                <img src={image} alt='Ksorstn.org Wordpress Blog image' />
                            </div>
                            <div className='project-text'>
                                <h3 className='project-title'>{title}</h3>
                                <p className='project-description'>
                                    {content}
                                </p>
                                <ul className='project-tech-stack'>
                                    {techStack.map((item: any) => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </a>}
        </motion.article>
    )
}))

export default WorkSection