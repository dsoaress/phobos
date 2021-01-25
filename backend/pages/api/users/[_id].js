import nc from 'next-connect'

import { all } from '@/middlewares'
import { getUser } from '@/db'

const handler = nc()
handler.use(all)

handler.get(async (req, res) => {
  const _id = req.query._id

  const user = await getUser(req.db, { _id })
  res.send({ user })
})

export default handler
