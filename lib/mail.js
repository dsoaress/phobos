import mailgun from 'mailgun.js'

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

export async function sendMail(msg) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, msg)
  } catch (e) {
    throw new Error(`Não foi possível enviar o email: ${e.message}`)
  }
}
