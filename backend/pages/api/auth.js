import nc from 'next-connect'
import { all } from '@/middlewares'
import passport from 'middlewares/passport'
import { extractUser } from '@/lib/api-helpers'

const handler = nc()

handler.use(all)

handler.get(async (req, res) => {
  // filter out password
  if (!req.user) return res.json({ user: null })
  const { password, ...u } = req.user
  res.json({ user: u })
})

handler.post(passport.authenticate('local'), (req, res) => {
  res.json({ user: extractUser(req.user) })
})

handler.delete((req, res) => {
  req.logOut()
  res.status(204).end()
})

export default handler
