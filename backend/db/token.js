import { nanoid } from 'nanoid'

export function findTokenByIdAndType(db, _id, type) {
  return db.collection('tokens').findOne({
    _id,
    type
  })
}

export function findAndDeleteTokenByIdAndType(db, _id, type) {
  return db
    .collection('tokens')
    .findOneAndDelete({ _id, type })
    .then(({ value }) => value)
}

export function insertToken(db, { userId, type, expireAt }) {
  const securedTokenId = nanoid(32)
  return db
    .collection('tokens')
    .insertOne({
      _id: securedTokenId,
      userId,
      type,
      expireAt
    })
    .then(({ ops }) => ops[0])
}
