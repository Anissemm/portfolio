import { forwardRef, useEffect, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import KsorstnImgSm from '../../assets/ksorstn-sm.jpg'
import KsorstnImgLg from '../../assets/ksorstn-lg.jpg'
import GoogleDocCloneSm from '../../assets/inifinityEditor-sm.png'
import GoogleDocCloneLg from '../../assets/inifinityEditor-lg.png'
import './Work.scss'
import useCurrentSection from "../../hooks/useCurrentSection"
import slugify from "slugify"
import { useResizeObserver } from "../../hooks/useResizeObserver"
import { useAppSelector } from "../../store"
import { getCurrentBreakpoint } from "../../store/reducers/uiSlice"
import Heading from "../Heading"
import isTouchDevice from 'is-touch-device'
import { ReactComponent as ExternalLinkIcon } from '../../assets/svg/external-link-icon.svg'
import { ReactComponent as Cross } from '../../assets/svg/cross.svg'

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
            <Heading itemNumber={2}>Some things I did</Heading>
            <div className="projects">
                <Project
                    id="ksorst"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-20px' }}
                    title='Blog website - Ksorstn.org'
                    link='https://ksorstn.org'
                    techStack={['HTML', 'CSS', 'Javascript', 'PHP', 'Wordpress']}
                    largeScreen={largeScreen}
                    image={largeScreen ? KsorstnImgLg : KsorstnImgSm}
                    content='Built a custom responsive WordPress theme from scratch for a multi-page blog website.' />
                <Project
                    id="google-doc-1"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-20px' }}
                    title='Google Doc Clone - "Infinity Editor"'
                    largeScreen={largeScreen}
                    image={largeScreen ? GoogleDocCloneLg : GoogleDocCloneSm}
                    link='https://doc-editor-tau.vercel.app'
                    techStack={['NextJS', 'Firebase', 'QuillJs', 'TailwindCss']}
                    content='Mobile-friendly rich text editor with cloud autosave. Allows to create, edit, print, and download documents in Docx format.' />
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
    id: string
}

const Project = motion(forwardRef<HTMLDivElement, ProjectCardProps>(({ title = '', content = '', techStack, image = '', id = '', link = '#', largeScreen = false }, ref) => {
    const [imageHeight, setImageHeight] = useState<undefined | number | null>()
    const [setImageRef, imageEntry] = useResizeObserver()
    const [hovered, setHovered] = useState(false)
    const [touchFirstClick, setTouchFirstClick] = useState(true)

    useEffect(() => {
        setImageHeight(imageEntry?.borderBoxSize[0].blockSize)
    }, [imageEntry])

    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            const projectId = e.target?.closest('[data-project-id]')?.dataset?.projectId

            if (projectId !== id) {
                setHovered(false)
            }
        }

        document.addEventListener('pointerdown', handleOutsideClick)

        return () => document.removeEventListener('pointerdown', handleOutsideClick)
    }, [])

    const isTouch = isTouchDevice()

    return (
        <motion.article
            ref={ref}
            className="project">
            {largeScreen ?
                <div>
                    <div className="project-wrapper">
                        <div
                            data-project-id={id}
                            onPointerEnter={(e: any) => {
                                if (e.pointerType !== 'touch') {
                                    setHovered(true)
                                }
                            }}
                            onPointerLeave={(e: any) => {
                                if (e.pointerType !== 'touch') {
                                    setHovered(false)
                                }
                            }}

                            className={`left-side ${hovered ? 'hovered' : ''}`}>
                            <AnimatePresence initial exitBeforeEnter>
                                <LayoutGroup id={id}>
                                    <div className='project-background' />
                                    <button type='button'
                                        onPointerDown={(e: any) => {
                                            if (e.pointerType === 'touch' && touchFirstClick) {
                                                setHovered(true)
                                            }
                                        }}
                                        disabled={!isTouch || hovered}
                                        className='external-link-btn'>
                                        <ExternalLinkIcon />
                                    </button>
                                    {!hovered && <motion.div key='normal' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layoutId={id} className="project-thumbnail" ref={setImageRef}>
                                        <div className='thumbnail-blend' />
                                        <img src={image} alt={`${title}-screenshot`} />
                                    </motion.div>}
                                    <header className='project-heading'>
                                        <h3>{title}</h3>
                                        <div className='tech-stack-wrapper'>
                                            <ul className='project-tech-stack'>
                                                {techStack.map((item: any) => <li key={item}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </header>
                                    {hovered && <motion.div key='hovered' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layoutId={id} className="project-thumbnail" ref={setImageRef}>
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
                                {content}
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
                            <ExternalLinkIcon className="external-link-icon" />
                            <div className="project-thumbnail" ref={setImageRef}>
                                <div className='thumbnail-blend' />
                                <img src={image} alt={`${title}\'s-screenshot`} />
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