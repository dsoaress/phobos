import connect from '../../utils/database'

export default async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email) {
      res.status(400).json({ error: 'Missing email on request body' })
      return
    }

    const { db } = await connect('users')
    const response = await db.findOne({ email })

    if (!response) {
      res.status(204).json({ error: 'User not found' })
      return
    }

    res.status(200).json(response)
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
