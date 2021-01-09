import nc from 'next-connect'

import { all } from '@/middlewares'
import { getBlogPost } from '@/db'

const handler = nc()
handler.use(all)

handler.get(async (req, res) => {
  const _id = req.query._id

  const post = await getBlogPost(req.db, { _id })
  res.send({ post })
})

export default handler
