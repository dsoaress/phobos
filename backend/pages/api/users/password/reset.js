import bcrypt from 'bcrypt'
import nc from 'next-connect'
import { sendMail } from '@/lib/mail'
import { database } from '@/middlewares'
import {
  findUserByEmail,
  updateUserById,
  findAndDeleteTokenByIdAndType,
  insertToken
} from '@/db'

const handler = nc()

handler.use(database)

handler.post(async (req, res) => {
  const user = await findUserByEmail(req.db, req.body.email)
  if (!user) {
    res.status(401).send('The email is not found')
    return
  }

  const token = await insertToken(req.db, {
    userId: user._id,
    type: 'passwordReset',
    expireAt: new Date(Date.now() + 1000 * 60 * 20)
  })

  const msg = {
    to: user.email,
    from: process.env.EMAIL_FROM,
    subject: 'Redefina sua senha',
    html: `
      <div>
        <p>Olá</p>
        <p><a href="${process.env.WEB_URL}/forget-password/${token._id}">Clique aqui</a> para redefinir sua senha.</p>
      </div>
      `
  }
  await sendMail(msg)
  res.end('ok')
})

handler.put(async (req, res) => {
  // password reset
  if (!req.body.password) {
    res.status(400).send('Password not provided')
    return
  }

  const deletedToken = await findAndDeleteTokenByIdAndType(
    req.db,
    req.body.token,
    'passwordReset'
  )

  if (!deletedToken) {
    res.status(403).send('This link may have been expired.')
    return
  }
  const password = await bcrypt.hash(req.body.password, 10)
  await updateUserById(req.db, deletedToken.userId, { password })
  res.end('ok')
})

export default handler
