import Logo from '../../assets/svg/logo'
import { motion, AnimateSharedLayout } from 'framer-motion'
import './Navbar.scss'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { getCurrentSection, setCurrentSection, setStopIntersectionObserver } from '../../store/reducers/navigationSlice'
import slugify from 'slugify'
import { moveSyntheticComments } from 'typescript'

interface NavbarProps {
    children?: React.ReactChildren
    items: string[]
    isLoading: boolean

}

const menuItemsVariants = {
    hidden: {
        x: 100,
        opacity: 0
    },
    visible: (i: number) => {
        const delay = i * 0.4 + 0.5;
        return {
            x: 0,
            opacity: 1,
            transition: {
                delay,
                duration: 0.5
            }
        }
    }
}

const Navbar: React.FC<NavbarProps> = ({ items, isLoading }) => {
    const currentSection = useAppSelector(getCurrentSection)
    const [logoLayoutId, setLogoLayoutId] = useState<'logo' | undefined>('logo')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setLogoLayoutId(undefined)
            }, 1000)
        }
    }, [isLoading])

    const handleClick = (e: any, section: string) => {
        dispatch(setStopIntersectionObserver({ stop: true, linkUsed: true }))
        dispatch(setCurrentSection(section))
        const timer = setTimeout(() => {
            dispatch(setStopIntersectionObserver({ stop: false, linkUsed: true }))
            clearTimeout(timer)
        }, 800)
    }

    return (
        <motion.nav className="main-nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <Logo />
                </li>
                <AnimateSharedLayout>
                    {items.map((menuItem, index) => {
                        const slugifiedItem = slugify(menuItem, { lower: true, replacement: '-' })
                        const isActive = currentSection === slugifiedItem

                        return (
                            <motion.li
                                variants={menuItemsVariants}
                                initial="hidden"
                                animate="visible"
                                key={`${menuItem}-${index + 1}`}
                                className="nav-item">

                                <motion.a
                                    data-is-nav-link
                                    data-ref-section={slugifiedItem}
                                    onClick={(e: any) => {
                                        handleClick(e, slugifiedItem)
                                    }}
                                    animate={{ opacity: isActive ? 1 : 0.7 }}
                                    href={`#${slugifiedItem}`}
                                    className={`nav-link ${isActive ? 'active' : ''}`}>
                                    <div className='numeration'>{`0${index} - `}</div>
                                    <div>{menuItem}</div>
                                    {isActive && <Line />}

                                </motion.a>
                            </motion.li>
                        )
                    })}
                </AnimateSharedLayout>
            </ul>
        </motion.nav>
    )
}

const Line: React.FC = () => {
    return (
        <motion.div
            className="Line"
            layoutId='Line'
        />
    )
}

export default Navbar