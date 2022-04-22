import { forwardRef } from "react"
import { motion } from "framer-motion"
import KsorstnImg from '../../assets/ksorstn-xl.jpg'
import './Work.scss'

interface WorkProps {
    id: string
}

const WorkSection = forwardRef<HTMLDivElement, WorkProps>(({ id }, ref) => {
    return (
        <section id={id} ref={ref} className="section work-section" >
            <motion.h2
                className='section-heading'>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0, }}
                    viewport={{ margin: '-20px' }}
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
                <article className="project">
                    <div className="project-wrapper">
                        <div className="project-thumbnail">
                            <picture>
                                <img src={KsorstnImg} />
                            </picture>
                        </div>
                    </div>
                </article>
            </div>  
        </section>
    )
})

export default WorkSection