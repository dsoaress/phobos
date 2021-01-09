import nc from 'next-connect'
import { all } from '@/middlewares'
import { getPages } from '@/db'

const handler = nc()
handler.use(all)

handler.get(async (req, res) => {
  const pages = await getPages(req.db)

  res.send({ pages })
})

export default handler
