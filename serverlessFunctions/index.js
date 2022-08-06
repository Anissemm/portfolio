const nodemailer = require('nodemailer')
const unirest = require('unirest')

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 587,
    secure: false,
    auth: {
        user: 'dima.anissem@yandex.ru',
        pass: 'cazpyxzghxhmnvwi'
    },
})

const sendMail = async ( {email, name, subject, message} ) => {
    const info = await transporter.sendMail({
    from: `"Portfolio: ${name}" <dima.anissem@yandex.ru>`,
    to: "dima.anissem@yandex.ru",
    subject: subject ? subject : 'No subject',
    html: `
    <p>${message}</p>
    <br>
    <p>Sent from Portfolio form</p>
    `
  })

  return info
}


module.exports.handler = async function (event, context ) {
    const {email, name, subject, message, captcha} = context.getPayload()

    if (!captcha) {
      throw new Error('Missing captcha token')
    }

    const {body: captchaValidation} = await unirest.post('https://www.google.com/recaptcha/api/siteverify')
    .field('secret', '6LeWF0AhAAAAALlI0nj-ALS9Pq2coo4mJOSEfvpF') 
    .field('response', captcha) 

    if (!captchaValidation.success) {
      const errors = captchaValidation['error-codes']
      throw new Error('invalid recaptcah code')
    }


    if (!email || !message || !name) {
        throw new Error('missing entry data')
    }

    const emailInfo = await sendMail({email, message, name, subject})

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                status: 'email sent',
                success: true,
                info: emailInfo
            }
        )
    };
};
