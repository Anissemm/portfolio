import { useEffect, useRef, useState } from "react"
import Navbar from "./components/Navbar"
import './App.scss'
import Main from "./components/Main"
import FirstLoadOverlay from "./components/FirstLoadOverlay"
import { useAppSelector } from "./store"
import { getCurrentSection } from "./store/reducers/navigationSlice"
import Footer from "./components/Footer"
import { main } from "@popperjs/core"
import { MotionConfig } from "framer-motion"
import { JSDocNullableType } from "typescript/lib/tsserverlibrary"
import useScreenBreakpoint from "./hooks/useScreenBreakpoint"

const menuItems = [
  'Hello',
  'About',
  'Work',
  'Contact'
]

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)
  const currentSection = useAppSelector(getCurrentSection)
  useScreenBreakpoint()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!firstLoad) {
      if (currentSection === 'hello') {
        window.history.pushState({}, currentSection, window.location.origin)
      } else {
        window.history.pushState({}, currentSection, `#${currentSection}`)
      }
    }
  }, [currentSection, firstLoad])

  useEffect(() => {
    setFirstLoad(false)
  }, [])

  return (
    <>
      <FirstLoadOverlay key='first-load' show={isLoading}>
        <Navbar key='navbar' isLoading={isLoading} items={menuItems} />
        <Main key='main' menuItems={menuItems} />
        <Footer />
      </FirstLoadOverlay>
    </>
  )
}

export default App