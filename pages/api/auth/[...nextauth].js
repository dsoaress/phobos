import NextAuth from 'next-auth'
import { Email } from 'next-auth/providers'
import nodemailer from 'nodemailer'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Email({
      server: {
        port: 465,
        host: process.env.EMAIL_HOST,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: ({ identifier: email, url, provider }) => {
        return new Promise((resolve, reject) => {
          const { server, from } = provider
          const baseUrl = process.env.NEXTAUTH_URL
          const site = baseUrl.replace(/^https?:\/\//, '')

          nodemailer.createTransport(server).sendMail(
            {
              to: email,
              from,
              subject: `Entrar em  ${site}`,
              text: text({ url }),
              html: html({ url })
            },
            error => {
              if (error) {
                logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error)
                return reject(new Error('SEND_VERIFICATION_EMAIL_ERROR', error))
              }
              return resolve()
            }
          )
        })
      }
    })
  ],
  pages: {
    signOut: '/',
    verifyRequest: '/verify-request' // (used for check email message)
  },
  database: process.env.DATABASE_URL
}

export default (req, res) => NextAuth(req, res, options)

const html = ({ url }) => {
  const backgroundColor = '#f9f9f9'
  const textColor = '#444444'
  const mainBackgroundColor = '#ffffff'
  const buttonBackgroundColor = '#346df1'
  const buttonBorderColor = '#346df1'
  const buttonTextColor = '#ffffff'

  return `
    <body style="background: ${backgroundColor};">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            <strong>Olá :)</strong>
          </td>
        </tr>
      </table>
      <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            Para acessar o painel administrativo basta clicar no botão abaixo
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Entrar</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            Se você não solicitou este e-mail, pode ignorá-lo com segurança.
          </td>
        </tr>
      </table>
    </body>
  `
}

const text = ({ url }) =>
  `Para acessar o painel administrativo basta clicar no botão abaixo: \n\n${url}\n\n`
