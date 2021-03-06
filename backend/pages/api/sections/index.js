import nc from 'next-connect'
import { all } from '@/middlewares'
import { getSections } from '@/db'

const handler = nc()
handler.use(all)

handler.get(async (req, res) => {
  const sections = await getSections(req.db)

  res.send({ sections })
})

export default handler
