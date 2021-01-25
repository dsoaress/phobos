import nc from 'next-connect'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import bcrypt from 'bcrypt'

import { all } from '@/middlewares'
import { insertUser, findUserByEmail, getUsers, updateUserById } from '@/db'
import { extractUser } from '@/lib/api-helpers'

const upload = multer({ dest: '/tmp' })
const handler = nc()
handler.use(all)

const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret
} = new URL(process.env.CLOUDINARY_URL)

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
})

handler.get(async (req, res) => {
  const users = await getUsers(req.db)
  res.send({ users })
})

handler.patch(upload.single('image'), async (req, res) => {
  if (!req.user) {
    req.status(401).end()
    return
  }
  let image
  if (req.file) {
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: 'fill'
    })
    image = imageUpload.secure_url
  }
  const { title } = req.body

  const user = await updateUserById(req.db, req.user._id, {
    ...(title && { title }),
    ...(image && { image })
  })

  res.json({ user: extractUser(user) })
})

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('You need to be authenticated')
  }
  const { title, password } = req.body
  const email = normalizeEmail(req.body.email)
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.')
    return
  }
  if (!password || !title) {
    res.status(400).send('Missing field(s)')
    return
  }
  if (await findUserByEmail(req.db, email)) {
    res.status(403).send('An email account already exists')
    return
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await insertUser(req.db, {
    email,
    password: hashedPassword,
    title
  })
  req.logIn(user, err => {
    if (err) throw err
    res.status(201).json({
      user: extractUser(req.user)
    })
  })
})

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

export default handler
