import slugify from "slugify"
import useCurrentSection from "../../hooks/useCurrentSection"
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useFormik } from "formik"
import * as yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import Input from "../Input"
import './ContactMe.scss'
import { useEffect, useRef, useState } from "react"

const variants = {
    hidden: {
        y: -100,
        opacity: 0,
    },
    visible: (i: number) => {
        const delay = i * 0.2 + 0.2

        return {
            y: 0,
            opacity: 1,
            transition: {
                y: {
                    delay,
                    duration: 0.3
                },
                opacity: {
                    delay,
                    duration: 0.4
                }
            }
        }
    }
}

const validationSchema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    name: yup.string().required('Name is Required'),
    subject: yup.string().optional(),
    message: yup.string().required('Message is Requried')
})

interface ContactMeProps {
    id: string
}

type ResponseResultObj = {
    error?: string
    result?: any,
    success: boolean
}

const ContactMe: React.FC<ContactMeProps> = ({ id }) => {
    const setSectionRef = useCurrentSection('Contact')
    const slugifiedId = slugify(id, { lower: true, replacement: '-' })
    const recaptchaRef = useRef<null | ReCAPTCHA>(null)

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<ResponseResultObj | null>(null)

    const contactForm = useFormik({
        initialValues: {
            email: '',
            name: '',
            subject: '',
            message: ''
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const params = new URLSearchParams(values)

            try {
                const captcha = await recaptchaRef.current?.executeAsync()

                if (typeof captcha === 'string') {
                    params.append('captcha', captcha)
                }

                const response = await fetch('https://functions.yandexcloud.net/d4enk97oi3nc670n9j2e', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                })
                const data = await response.json()

                if (!data?.success) {
                    throw new Error('Something went wrong. Please, retry later.')
                }

                setResult({
                    success: true,
                    result: 'Messaege was sent.'
                })

            } catch (error: any) {
                setResult({
                    success: false,
                    error: error.message
                })
            } finally {
                setLoading(false)
            }
        }
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult(null)
        }, 3000)
    }, [result])

    return (
        <section id={slugifiedId} ref={setSectionRef} className="section contact-me-section" >
            <h2
                className='section-heading'>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0, }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.5 }}
                    className='numeration'>
                    03 - </motion.div>
                <motion.div
                    viewport={{ once: true, margin: '-20px' }}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0, }}
                    transition={{ duration: 0.5, delay: 0.5 }}>Message Me</motion.div>
            </h2>
            <motion.div className='contact-body'>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true, margin: '-20px' }}
                    className={`contact-body-background ${loading ? 'contact-body-background--loading' : ''}`} />
                <div className={`form-loader ${loading ? 'form-loader--shown' : ''}`} />
                <AnimatePresence>
                    {result &&
                        <div className='result-message-wrapper'>
                            <motion.div
                                className={`result-message`}
                                variants={variants}
                                initial='hidden'
                                animate='visible'
                                exit='hidden'>
                                <span>{result?.success ? result?.result : result?.error}</span>
                            </motion.div>
                        </div>}
                </AnimatePresence>
                <form onSubmit={contactForm.handleSubmit}>
                    <div>
                        <div className='input-wrapper'>
                            <Input
                                label='Email'
                                id='email'
                                type='email'
                                name='email'
                                value={contactForm.values.email}
                                onChange={contactForm.handleChange}
                                onBlur={contactForm.handleBlur}
                                error={contactForm.touched.email && contactForm.errors.email as string}
                                disabled={loading}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <Input
                                label='Name'
                                id='name'
                                type='name'
                                name='name'
                                value={contactForm.values.name}
                                onChange={contactForm.handleChange}
                                onBlur={contactForm.handleBlur}
                                error={contactForm.touched.name && contactForm.errors.name as string}
                                disabled={loading}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <Input
                                label='Subject'
                                id='subject'
                                type='subject'
                                name='subject'
                                value={contactForm.values.subject}
                                onChange={contactForm.handleChange}
                                onBlur={contactForm.handleBlur}
                                error={contactForm.touched.subject && contactForm.errors.subject as string}
                                disabled={loading}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <Input
                                as='textarea'
                                label='Message'
                                id='message'
                                type='message'
                                name='message'
                                value={contactForm.values.message}
                                onChange={contactForm.handleChange}
                                onBlur={contactForm.handleBlur}
                                error={contactForm.touched.message && contactForm.errors.message as string}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <motion.button
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className='submit-button'
                                type='submit'
                                disabled={loading}
                            >
                                Send
                            </motion.button>
                        </div>
                    </div>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        theme='dark'
                        size="invisible"
                        badge="bottomleft"
                        sitekey='6LeWF0AhAAAAAH0hXctGOksdsbNEIT6iWTF6uvo-'
                    />
                </form>
                {/* {loading && <div className='form-loader' />} */}
            </motion.div>
        </section >
    )
}

export default ContactMe