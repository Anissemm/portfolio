import React, { MutableRefObject } from "react"
import WelcomeHeader from '../Welcome'
import About from '../About'

interface MainProps {
    menuItems: string[];
    sectionRefs: Array<MutableRefObject<HTMLDivElement | null>>;


}

const Main: React.FC<MainProps> = ({menuItems, sectionRefs}) => {
    return (
        <>
            <WelcomeHeader id={menuItems[0]} ref={sectionRefs[0]} />
            <About id={menuItems[1]} ref={sectionRefs[1]} />
            <div id={menuItems[2]} ref={sectionRefs[2]} className="section" >3</div>
        </>
    )
}

export default Main