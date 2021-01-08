import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default async function connect(collectionName) {
  if (!client.isConnected()) await client.connect()

  const db = client.db(process.env.DB_NAME).collection(collectionName)
  return { db, client }
}
