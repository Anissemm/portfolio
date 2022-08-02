import { AnimatePresence } from 'framer-motion'
import React, { ChangeEvent, createElement, CSSProperties, FocusEvent, forwardRef, ReactElement, RefAttributes, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Tooltip from '../Tooltip'
import styles from './Input.module.scss'

interface InputProps extends RefAttributes<HTMLInputElement> {
    error: string | false | undefined | null,
    as?: 'input' | 'textarea'
    id: string
    type?: string
    name: string
    value?: string | number
    placeholder?: string
    label?: string
    disabled?: boolean
    placeTooltip?: 'top-end' | 'top-start'
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

type CustomInput = {
    focus: () => void
    blur: () => void
}

const Input = forwardRef<CustomInput | null, InputProps>((
    {
        id,
        error = false,
        as = 'input',
        type = 'text',
        label,
        placeTooltip = 'top-end',
        onFocus,
        onBlur,
        ...props
    }, ref): ReactElement | null => {

    const inputRef = useRef<null | HTMLInputElement>(null)
    const [showError, setShowError] = useState(false)
    const [focused, setFocused] = useState(false)

    const textareaStyle: CSSProperties | undefined = as === 'textarea' ?
        {
            display: 'flex',
            flexDirection: 'column'
        } : undefined

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus()
        },
        blur: () => {
            inputRef.current?.blur()
        }
    }))

    useEffect(() => {
        if (error && !focused) {
            setShowError(true)
            const timerId = setTimeout(() => {
                setShowError(false)
            }, 5000)
            return () => clearTimeout(timerId)
        } else {
            setShowError(false)
        }
    }, [error, focused])

    return (
        <div style={{ marginBottom: 5 }}>
            <div className={styles.wrapper} style={textareaStyle}>
                <label className={styles.label} htmlFor={id}>{label}</label>
                {createElement(as, {
                    'aria-label': label,
                    className: `${error && styles.error} ${styles.input} ${as === 'textarea' ? styles.textarea : ''}`,
                    ref: inputRef,
                    // wrap: as === 'textarea' ? 'off' : undefined,
                    id,
                    type,
                    onFocus: (e: FocusEvent<HTMLInputElement>) => {
                        if (typeof onFocus === 'function') {
                            onFocus(e)
                        }
                        setFocused(true)
                    },
                    onBlur: (e: FocusEvent<HTMLInputElement>) => {
                        if (typeof onBlur === 'function') {
                            onBlur(e)
                        }
                        setFocused(false)
                    },
                    ...props
                })}
            </div>
            <AnimatePresence>
                {showError && <Tooltip strategy='fixed' placeTooltip={placeTooltip} referenceElement={inputRef.current}>{error}</Tooltip>}
            </AnimatePresence>
        </div>
    )
})

export default Input