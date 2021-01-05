import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default async function connect(collectionName) {
  if (!client.isConnected()) await client.connect()

  const db = client.db(process.env.DATABASE_NAME).collection(collectionName)
  return { db, client }
}
