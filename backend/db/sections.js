export async function getSections(db) {
  return db.collection('sections').find({}).toArray()
}

export async function getSection(db, { _id }) {
  return db.collection('sections').findOne({ _id })
}
