import nc from 'next-connect'

import { all } from '@/middlewares'
import { getSection } from '@/db'

const handler = nc()
handler.use(all)

handler.get(async (req, res) => {
  const _id = req.query._id

  const section = await getSection(req.db, { _id })
  res.send({ section })
})

export default handler
