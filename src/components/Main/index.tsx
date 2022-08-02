import React, { MutableRefObject } from "react"
import WelcomeHeader from '../Welcome'
import About from '../About'
import Work from '../Work'
import { useAppDispatch } from "../../store"
import ContactMe from "../ContactMe"

interface MainProps {
    menuItems: string[]
}

const Main: React.FC<MainProps> = ({ menuItems }) => { 
    const dispatch = useAppDispatch()

    return (
        <>
            <WelcomeHeader id={menuItems[0]} />
            <About id={menuItems[1]}  />
            <Work id={menuItems[2]} />
            <ContactMe id={menuItems[3]} />
        </>
    )
}

export default Main