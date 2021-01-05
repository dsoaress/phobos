import connect from '../../utils/database'

export default async (req, res) => {
  // create blog post
  if (req.method === 'POST') {
    const { title, date, status, image, body } = req.body

    if (!title || !date || !status || !image || !body) {
      res.status(400).json({ error: 'Missing body parameter' })
      return
    }

    const { db } = await connect('blog')
    const response = await db.insertOne({
      title,
      date,
      status,
      image,
      body
    })

    res.status(200).json(response.ops[0])
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
