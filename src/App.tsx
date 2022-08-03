import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import './App.scss'
import Main from "./components/Main"
import { AnimatePresence } from "framer-motion"
import FirstLoadOverlay from "./components/FirstLoadOverlay"
import { useAppSelector } from "./store"
import { getCurrentSection } from "./store/reducers/navigationSlice"

const menuItems = [
  'Hello',
  'About',
  'Work',
  'Contact'
]

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const currentSection = useAppSelector(getCurrentSection)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (currentSection === 'hello') {
      window.history.pushState({}, currentSection, window.location.origin)
    } else {
      window.history.pushState({}, currentSection, `#${currentSection}`)
    }
  }, [currentSection])

  return (
    <>
      <AnimatePresence>
        {isLoading ? <FirstLoadOverlay key='first-load' /> :
          <>
            <Navbar key='navbar' isLoading={isLoading} items={menuItems} />
            <Main key='main' menuItems={menuItems} />
          </>}
      </AnimatePresence>
    </>
  )
}

export default App