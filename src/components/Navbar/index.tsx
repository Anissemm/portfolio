import Logo from '../../assets/svg/logo'
import { motion, AnimateSharedLayout } from 'framer-motion'
import './Navbar.scss'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store'
import { getCurrentSection } from '../../store/reducers/navigationSlice'
import slugify from 'slugify'

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

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setLogoLayoutId(undefined)
            }, 500)
        }
    }, [isLoading])

    return (
        <nav className="main-nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <Logo layoutId={logoLayoutId} />
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
                                    data-ref-section={menuItem}
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
        </nav>
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