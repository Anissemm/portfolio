import Logo from '../../assets/svg/logo'
import { motion, AnimateSharedLayout } from 'framer-motion';
import './Navbar.scss'

interface NavbarProps {
    children?: React.ReactChildren;
    activeSection: number,
    items: string[]

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

const Navbar: React.FC<NavbarProps> = ({ activeSection, items }) => {

    return (
        <nav className="main-nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <Logo />
                </li>
                <AnimateSharedLayout>
                    {items.map((menuItem, index) => {
                        const isActive = activeSection === index;

                        return (
                            <motion.li
                                variants={menuItemsVariants}
                                initial="hidden"
                                animate="visible"
                                key={`${menuItem}-${index + 1}`}
                                className="nav-item">

                                <motion.a
                                    animate={{ opacity: isActive ? 1 : 0.7 }}
                                    href={`#${menuItem}`}
                                    className={`nav-link ${isActive ? 'active' : ''}`}>
                                    <div>
                                        <div className='numeration'>{`0${index} - `}</div>
                                        <div>{menuItem}</div>
                                    </div>
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