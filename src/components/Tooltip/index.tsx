import React, { PropsWithChildren, useState } from 'react'
import { usePopper } from 'react-popper'
import type { Placement } from '@popperjs/core'
import style from './Tooltip.module.scss'
import { Variants, motion } from 'framer-motion'

const tooltipVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

interface TooltipProps extends PropsWithChildren<any> {
    referenceElement: HTMLElement | null | undefined
    strategy?: 'fixed' | 'absolute'
    placement?: Placement
    shadow?: string
}

const Tooltip: React.FC<TooltipProps> =
    ({ referenceElement, strategy = 'absolute', placement = 'top-end', children, shadow = '#000' }) => {
        const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
        const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
        const { styles, attributes } = usePopper(referenceElement, popperElement, {
            strategy,
            placement,
            modifiers: [
                {
                    name: 'arrow',
                    options: { element: arrowElement }
                },
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10],
                    },
                }
            ],
        });

        return (
            <motion.div
                variants={tooltipVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                ref={setPopperElement}
                className={`${style.tooltip}`}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className={style.childrenWrapper}>
                    {children}
                </div>
                <div ref={setArrowElement} className={`${style.arrow}`} style={{ color: shadow, ...styles.arrow }} />
            </motion.div>
        )
    }

export default Tooltip