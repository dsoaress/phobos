import { ObjectID } from 'mongodb'

import connect from '../../../utils/database'

export default async (req, res) => {
  if (req.method === 'GET') {
    const id = req.query.id

    if (!id) {
      res.status(400).json({ error: 'Missing ID on request body' })
      return
    }

    let _id
    try {
      _id = new ObjectID(id)
    } catch {
      res.status(400).json({ error: 'Wrong objectID' })
      return
    }

    const { db } = await connect('blog')

    const response = await db.findOne({ _id })

    if (!response) {
      res.status(400).json({ error: `Post with ID ${_id} not found` })
      return
    }

    res.status(200).json(response)
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
