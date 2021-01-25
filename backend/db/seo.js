export async function getSEO(db) {
  return db.collection('seo').findOne({ _id: 'seo' })
}

export async function createSEO(db, { title, gtm, description, userId }) {
  return db
    .collection('seo')
    .insertOne({
      _id: 'seo',
      title,
      gtm,
      description,
      userId
    })
    .then(({ ops }) => ops[0])
}

export async function updateSEO(db, { title, gtm, description, userId }) {
  const update = {
    title,
    gtm,
    description,
    userId
  }
  return db
    .collection('seo')
    .findOneAndUpdate(
      { _id: 'seo' },
      { $set: update },
      { returnOriginal: false }
    )
    .then(({ value }) => value)
}
