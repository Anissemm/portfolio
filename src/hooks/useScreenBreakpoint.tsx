import React, { useEffect } from 'react'
import debounce from 'lodash.debounce'
import { useAppDispatch } from '../store'
import { setBreakpoint } from '../store/reducers/uiSlice'

const useScreenBreakpoint = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handler = debounce(() => {
            let screenBreakpoint = null
            if (window.matchMedia('(min-width: 360px)').matches &&
                window.matchMedia('(max-width: 540px)').matches) {
                screenBreakpoint = 'sxs'
            } else if (window.matchMedia('(min-width: 540px)').matches &&
                window.matchMedia('(max-width: 640px)').matches) {
                screenBreakpoint = 'xs'
            } else if (window.matchMedia('(min-width: 640px)').matches &&
                window.matchMedia('(max-width: 768px)').matches) {
                screenBreakpoint = 'sm'
            } else if (window.matchMedia('(min-width: 768px)').matches &&
                window.matchMedia('(max-width: 1024px)').matches) {
                screenBreakpoint = 'md'
            } else if (window.matchMedia('(min-width: 1024px)').matches &&
                window.matchMedia('(max-width: 1280px)').matches) {
                screenBreakpoint = 'lg'
            } else if (window.matchMedia('(min-width: 1280px)').matches &&
                window.matchMedia('(max-width: 1536px)').matches) {
                screenBreakpoint = 'xl'
            } else if (window.matchMedia('(min-width: 1536px)').matches) {
                screenBreakpoint = '2xl'
            }
            dispatch(setBreakpoint(screenBreakpoint))
        }, 100)

        handler();

        window.addEventListener('resize', handler, false)
        return () => window.removeEventListener('resize', handler, false)
    }, [])
}

export default useScreenBreakpoint