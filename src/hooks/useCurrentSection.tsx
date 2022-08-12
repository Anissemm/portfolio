import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import slugify from 'slugify'
import { useAppDispatch, useAppSelector } from '../store'
import { getStopObserver, setCurrentSection, setStopIntersectionObserver } from '../store/reducers/navigationSlice'

const useCurrentSection = (currentSection: string) => {
    const dispatch = useAppDispatch()
    const stopObserver = useAppSelector(getStopObserver)
    const [setElement, inView] = useInView({
        threshold: 0.51
    })

    useEffect(() => {
        if (inView && !stopObserver) {
            const slugified = slugify(currentSection, { lower: true, replacement: '-' })
            dispatch(setCurrentSection(slugified))
        }
    }, [inView, stopObserver])

    return setElement
}

export default useCurrentSection