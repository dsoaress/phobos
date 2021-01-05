import connect from '../../utils/database'

export default async (req, res) => {
  // create user
  if (req.method === 'POST') {
    const { title, role, image } = req.body

    if (!title || !role || !image) {
      res.status(400).json({ error: 'Missing body parameter' })
      return
    }

    const { db } = await connect('users')
    const response = await db.insertOne({
      title,
      role,
      image
    })

    res.status(200).json(response.ops[0])
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
