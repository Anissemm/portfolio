import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import slugify from 'slugify'
import { useAppDispatch } from '../store'
import { setCurrentSection } from '../store/reducers/navigationSlice'

const useCurrentSection = (currentSection: string) => {
    const dispatch = useAppDispatch()
    const [setElement, inView] = useInView({
        rootMargin: '-20px'
    })

    useEffect(() => {
        if (inView) {
            const slugified = slugify(currentSection, { lower: true, replacement: '-' })
            if (currentSection === 'Hello') {
                dispatch(setCurrentSection(slugified))
                window.history.pushState({}, currentSection, window.location.origin)
            } else {
                dispatch(setCurrentSection(slugified))
                window.history.pushState({}, currentSection, `#${slugified}`)
            }
        }
    }, [inView])


    return setElement
}

export default useCurrentSection