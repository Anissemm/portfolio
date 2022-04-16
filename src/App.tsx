import { useEffect, useRef } from "react"
import Navbar from "./components/Navbar"
import { useAppSelector } from "./store"
import { getAppMeta } from "./store/reducers/appMeta"
import './App.scss'
import useScrollSpy from 'react-use-scrollspy';
import Main from "./components/Main"

const menuItems = [
  'About',
  'Work',
  'Contact'
]

const App = () => {

  const sectionRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null)

  ];

  const activeSection = useScrollSpy({
    sectionElementRefs: sectionRefs,
    offsetPx: -100,
  });
  const appMeta = useAppSelector(getAppMeta)

  useEffect(() => {
    console.log(appMeta)
  }, [])

  return (
    <>
      <Navbar activeSection={activeSection} items={menuItems} />
      <Main menuItems={menuItems} sectionRefs={sectionRefs} />
    </>
  )
}

export default App