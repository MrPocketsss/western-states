import sgMail, { MailDataRequired } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

enum EmailType {
  forgot,
  register,
}

interface email {
  to: string
  from: string
  subject: string
  text?: string
  html?: string
}

type EmailTypeStrings = keyof typeof EmailType

export function sendMail({
  emailKind,
  to,
  tempPassword,
}: {
  emailKind: EmailTypeStrings
  to: string
  tempPassword?: string
}): void {
  const msg: MailDataRequired = {
    to,
    from: 'no-reply@cursedtale.com',
    subject: '',
    text: '',
    html: '',
  }
  if (emailKind === 'forgot') {
    ;(msg.subject = 'Forgotten Password'),
      (msg.text = `
      It looks like you forgot your password! No problem, here's a temporary
      password to get back into your account.\n\n

      ${tempPassword}\n\n 

      This password expires in 24 hours, so be sure to use this quickly! When
      you log in, you'll be asked to update your password.\n\n

      If you don't recognize this request, you can disregard this message.\n
      Thanks!
    `),
      (msg.html = `
      <div>
        <p>
          It looks like you forgot your password! No problem, here's a 
          temporary password to get back into your account.
        </p>
        <br/>
        <span style="background-color: rgb(158, 158, 158); padding: 10px">${tempPassword}</span>
        <br />
        <br />
        <p>
          This password expires in 24 hours, so be sure to use this quickly! 
          When you log in, you'll be asked to update your password.
        </p>
        <p>
          If you don't recognize this request, you can disregard this message.
        </p>
        <p>Thanks!</p>
      </div>
    `)
  }
  if (emailKind === 'register') {
    ;(msg.subject = 'Welcome to WSW Orders'),
      (msg.text = `
      It looks like you have been registered with WSW Orders! You can log in to
      your account at https://wsw.cursedtale.com with the temporary password 
      below\n\n

      ${tempPassword}\n\n 

      This password expires in 24 hours, so be sure to use this quickly! When
      you log in, you'll be asked to update your password.\n\n

      If you don't recognize this request, you can disregard this message.\n
      Thanks!
    `),
      (msg.html = `
      <div>
        <p>
        It looks like you have been registered with WSW Orders! You can log in 
        to your account at <a href="https://wsw.cursedtale.com">WSW Orders</a> 
        with the temporary password below:
        </p>
        <br/>
        <span style="background-color: rgb(158, 158, 158); padding: 10px">${tempPassword}</span>
        <br />
        <br />
        <p>
          This password expires in 24 hours, so be sure to use this quickly! 
          When you log in, you'll be asked to update your password.
        </p>
        <p>
          If you don't recognize this request, you can disregard this message.
        </p>
        <p>Thanks!</p>
      </div>
    `)
  }

  sgMail
    .send(msg)
    .then(() => console.log('email sent'))
    .catch((error) => console.error('oops! An email error occurred', error))
}
