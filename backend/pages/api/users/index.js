import nc from 'next-connect'
import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import bcrypt from 'bcryptjs'
import { all } from '@/middlewares'
import { extractUser } from '@/lib/api-helpers'
import { insertUser, findUserByEmail } from '@/db'

const handler = nc()

handler.use(all)

handler.post(async (req, res) => {
  const { name, password } = req.body
  const email = normalizeEmail(req.body.email)
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.')
    return
  }
  if (!password || !name) {
    res.status(400).send('Missing field(s)')
    return
  }
  if (await findUserByEmail(req.db, email)) {
    res.status(403).send('Já existe uma conta com o email informado')
    return
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await insertUser(req.db, {
    email,
    password: hashedPassword,
    name
  })
  req.logIn(user, err => {
    if (err) throw err
    res.status(201).json({
      user: extractUser(req.user)
    })
  })
})

export default handler
