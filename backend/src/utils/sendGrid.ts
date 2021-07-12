import sgMail, { MailDataRequired } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

enum EmailType {
  forgot,
  register,
}

type EmailTypeStrings = keyof typeof EmailType

export function sendMail({
  emailKind,
  to,
  tempCode,
}: {
  emailKind: EmailTypeStrings
  to: string
  tempCode?: string
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
      It looks like you forgot your password! No problem, Paste the below link
      into a web browser and we'll get you sorted.\n\n

      ${process.env.BASE_URL}/activate#${tempCode}\n\n

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
        <a href="${process.env.BASE_URL}/activate#${tempCode}">Activate your new account</a>
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
      your account by pasting the below link into a web browser and we'll get
      you sorted.\n\n

      ${process.env.BASE_URL}/activate#${tempCode}\n\n

      This password expires in 24 hours, so be sure to use this quickly! When
      you log in, you'll be asked to update your password.\n\n

      If you don't recognize this request, you can disregard this message.\n
      Thanks!
    `),
      (msg.html = `
      <div>
        <p>
        It looks like you have been registered with WSW Orders! Finish the sign
        in process by going to
          <a href="${process.env.BASE_URL}/activate#${tempCode}">WSW Orders</a>
        and creating your password.
        </p>
        <br/>
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
