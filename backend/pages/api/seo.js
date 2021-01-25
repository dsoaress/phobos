import nc from 'next-connect'

import { all } from '@/middlewares'
import { createSEO, getSEO, updateSEO } from '@/db'

const handler = nc()
handler.use(all)

handler.get(async (req, res) => {
  const seo = await getSEO(req.db)
  res.send({ seo })
})

handler.post(async (req, res) => {
  const { title, gtm, description } = req.body
  if (!req.user) {
    return res.status(401).send('You need to be authenticated')
  }

  if (!title || !description) {
    res.status(400).json({ error: 'Missing body parameter' })
    return
  }

  let seo
  if (await getSEO(req.db)) {
    seo = await updateSEO(req.db, {
      title,
      gtm,
      description,
      userId: req.user._id
    })
  } else {
    seo = await createSEO(req.db, {
      title,
      gtm,
      description,
      userId: req.user._id
    })
  }
  return res.json({ seo })
})

export default handler
