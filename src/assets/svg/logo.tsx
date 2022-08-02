import React, { forwardRef, HTMLAttributes, PropsWithChildren, RefAttributes } from "react"
import { motion, SVGMotionProps, Variants } from 'framer-motion'
import { SVGMotionComponents } from "framer-motion/types/render/svg/types"

const drawVariants: Variants = {
  hidden: (i: number) => {
    return {
      opacity: 0,
      y: i * 100
    }
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      opacity: {
        delay: 0.5,
        duration: 1
      }
    }
  },
}



const Logo = forwardRef<SVGSVGElement, PropsWithChildren<SVGMotionProps<SVGSVGElement>>>((props, ref) => {

  return (
    <motion.svg ref={ref} initial="hidden" animate="visible" xmlns="http://www.w3.org/2000/svg" fill='#0466C8' viewBox="0 0 78.89 54.19" {...props}>
      {props.children}

      <motion.g variants={drawVariants} custom={1}>
        <polygon
          points="0 54.19 2.3 54.19 16.34 13.38 0 54.19" />

        <polygon
          points="22.29 2.16 21.82 0.96 3.51 54.19 4.3 54.19 22.21 2.13 22.29 2.16" />

        <polygon
          points="22.89 3.65 5.51 54.19 6.3 54.19 23.32 4.72 22.89 3.65" />

        <polygon
          points="23.97 6.34 7.51 54.19 8.3 54.19 24.4 7.41 23.97 6.34" />

        <path
          id="right-part"
          d="M33.22,54.19h9.91L25,9,9.51,54.19h1l5.2-15h11.9ZM16,38.22l5.4-15.63,5.83,15.63Z" />
      </motion.g>
      <motion.g variants={drawVariants} custom={-1}>
        <path id="left-part" d="M46.27,54.19,50.47,42,37.8,9.27a93.54,93.54,0,0,1,16.49.34,19.74,19.74,0,0,1,6.65,1.93L64,2.65C58.43.27,52.26,0,48.15,0c-6,0-24.09.4-24.09.4L45.55,54.19Z" />

        <polygon points="48.27 54.19 51.53 44.7 51.11 43.62 47.48 54.19 48.27 54.19" />
        <polygon points="52.59 47.44 52.17 46.35 49.48 54.19 50.27 54.19 52.59 47.44" />
        <polygon points="53.65 50.17 53.23 49.09 51.48 54.19 52.27 54.19 53.65 50.17" />
        <polygon points="53.48 54.19 55.21 54.19 54.29 51.82 53.48 54.19" />

        <path d="M62,12.1l.66.42,3.11-9L65,3.14Z" />
        <path d="M67.38,4.45c-.22-.14-.43-.29-.65-.42l-3.16,9.18c.21.17.42.34.62.52Z" />
        <path d="M68.36,5.11,65.1,14.59c.2.21.38.43.57.65L69,5.59Z" />

        <path id="right-part" d="M78.88,27.29C78.65,18,75.76,11.44,69.93,6.37l-3.43,10a14,14,0,0,1,2.24,5.24c2,9.57-.66,15.43-3.42,19.15-2.37,3.18-7.52,4.71-9,5.09l-.2.6L59,54.19C73.82,51.19,79.12,36.89,78.88,27.29Z" />
      </motion.g>
    </motion.svg>
  )
})

export default motion(Logo)