import nc from 'next-connect'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'

import { all } from '@/middlewares'
import {
  deleteBlogPost,
  getBlogPosts,
  insertBlogPost,
  updateBlogPost
} from '@/db'

const upload = multer({ dest: '/tmp' })
const handler = nc()
handler.use(all)

const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret
} = new URL(process.env.CLOUDINARY_URL)

export const config = {
  api: {
    bodyParser: false
  }
}

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
})

handler.delete(async (req, res) => {
  const { _id } = req.body
  if (!req.user) {
    return res.status(401).send('You need to be authenticated')
  }

  const post = await deleteBlogPost(req.db, {
    _id,
    userId: req.user._id
  })

  return res.json({ post })
})

handler.get(async (req, res) => {
  const posts = await getBlogPosts(req.db)
  res.send({ posts })
})

handler.post(upload.single('image'), async (req, res) => {
  const { body, date, status, title } = req.body
  if (!req.user) {
    return res.status(401).send('You need to be authenticated')
  }

  if (!body || !date || !req.file || !title) {
    res.status(400).json({ error: 'Missing body parameter' })
    return
  }

  const { secure_url } = await cloudinary.uploader.upload(req.file.path)

  const post = await insertBlogPost(req.db, {
    body,
    date,
    image: secure_url,
    status,
    title,
    userId: req.user._id
  })

  return res.json({ post })
})

handler.patch(async (req, res) => {
  const { _id, body, date, image, status, title } = req.body
  if (!req.user) {
    return res.status(401).send('You need to be authenticated')
  }

  if (!body || !date || !image || !title) {
    res.status(400).json({ error: 'Missing body parameter' })
    return
  }

  const post = await updateBlogPost(req.db, {
    _id,
    body,
    date,
    image,
    status,
    title,
    userId: req.user._id
  })

  return res.json({ post })
})

export default handler
