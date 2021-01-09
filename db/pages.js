export async function getPages(db) {
  return db.collection('pages').find({}).toArray()
}
